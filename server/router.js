function initRouter(app, path) {
    app.set('view engine', 'ejs')
    app.set("trust proxy", 1)

    /*
    * Redirect to https
    */

    app.use (function (req, res, next) {
        if (req.secure || req.rawHeaders[1] == "localhost:3003" || req.rawHeaders[1] == "127.0.0.1:3003" || req.rawHeaders[1] == "10.0.2.2:3003") {
            // request was via https, so do no special handling
            next();
        } else if (!req.secure && req.rawHeaders[1] !== "localhost:3003" || req.rawHeaders[1] !== "127.0.0.1:3003" || req.rawHeaders[1] !== "10.0.2.2:3003") {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
        }
    })

    app.get('/', function(req, res) {
        res.render('pages/index');
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
