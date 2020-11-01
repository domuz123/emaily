const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredit')
const Mailer = require('../services/mailer')
const surveyTemplate = require('../services/emailTemplate/surveyTemplate')
const mongoose = require('mongoose')

const Survey = mongoose.model('surveys')

module.exports = app => {

    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!')
    })

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = Path.createPath('/api/surveys/:surveyId/:choice');
   
        _.chain(req.body)
          .map(({ email, url }) => {
        if(url)
              { 
               const match = p.test(new URL(url).pathname);
            if (match) {
              return { email, surveyId: match.surveyId, choice: match.choice };
            }
        }
          })
          .compact()
          .uniqBy('email', 'surveyId')
          .each(({ surveyId, email, choice }) => {
            console.log(surveyId, email, choice)
            Survey.updateOne(
              {
                _id: surveyId,
                recipients: {
                  $elemMatch: { email: email, responded: false },
                },
              },
              {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
              }
            ).exec();
          })
          .value();
  
        res.send({});
      });

 
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
       const {title, body, subject, recipients} = req.body
       const survey = new Survey({
           title,
           subject,
           body,
           recipients: recipients.split(',').map(email => ({email: email.trim()})),
           _user: req.user.id,
           dateSent: Date.now() 
       })
     
       const mailer = new Mailer(survey, surveyTemplate(survey) )
        try {
        await mailer.send()
        await survey.save()
        req.user.credits -= 1
        const user =  await req.user.save()

        res.send(user)
        }
        catch (err){
        res.status(422).send(err)
        }

    })
}