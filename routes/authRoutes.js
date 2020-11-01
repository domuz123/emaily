const passport = require('passport')

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']

    }))

    app.get('/api/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/surveys')
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
   
    })
}
//ojzAchRsh54HKvQz -prod pass
//HHdIz0nLUr4xV97z -dev pass