function initRouter(app, path, port) {
    app.set('view engine', 'ejs')
    app.set("trust proxy", 1)

    const domain = process.env.DOMAIN_HOST || "localhost"
    const ip = process.env.IP || "127.0.0.1"

    /*
    * Redirect to https
    */
    app.use (function (req, res, next) {
        if (req.secure || req.rawHeaders[1] == `${domain}:${port}` || req.rawHeaders[1] == `${ip}:${port}` ) {
            // request was via https, so do no special handling
            next()
        } else if (!req.secure && req.rawHeaders[1] !== `${domain}:${port}` || req.rawHeaders[1] !== `${ip}:${port}` ) {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url)
        }
    });

    app.get('/', function(req, res) {
        res.render('pages/index')
    })

    app.all("*", function (req, res, next) {

        if (req.params[0].substr(-5,5) === '.html') return

        // render file in views folder
        if (req.params[0].substr(0,7) === '/views/') {
            const page = req.params[0].replace('/views/', '').replace('.ejs', '')
            res.render(page)

            return
        }

        res.sendFile(path + req.params[0]) // router other file
    })
}

module.exports = {
    initRouter
}
