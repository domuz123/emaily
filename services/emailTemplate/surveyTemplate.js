const keys = require('../../config/keys')

module.exports = (survey) => {
    return  `<html> 

            <body> 
               <div style="text-align:center">
                 <h3>I would like your feedback</h3> <p>Please answer your question</p>
                 <p>${survey.body} </p>
                 <div> <a href='${keys.redirectDomain}/api/surveys/${survey.id}/Yes'>Yes</a></div>
                 <div> <a href='${keys.redirectDomain}/api/surveys/${survey.id}/No'>No</a></div>
              </div>                
            </body> 

            </html>`

}