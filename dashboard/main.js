let express = require("express");
const path = require("path");
const config = require('../settings.json')

class dashboard {
    constructor(client, serw, prodkt, serwer) {
        this.client = client;
        this.serw = serw;
        this.serwer = serwer;
        this.prodkt = prodkt;
        this.app = express()
    }
    init() {
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "html/index.html"))
        })

        this.app.get("/panel", (req, res) => {
            res.sendFile(path.join(__dirname, "html/panel.html"))
        })

        this.app.get("/invite", (req, res) => {
            res.redirect(config.invite)
        })
        this.app.use('/api/discord', (req, res, next) => {
            req.djs = this.client;
            req.uzytnik = this.serw;
            req.prodkt = this.prodkt;
            req.serwer = this.serwer;
            next();
        }, require('./api/discord'));

        this.app.use((err, req, res, next) => {
            switch(err.message) {
                case 'NoCodeProvided':
                    return res.status(400).send({
                        status: 'ERROR',
                        error: err.message,
                    });
                default:
                    return res.status(400).send({
                        status: 'ERROR',
                        error: err.message
                    })
            }
        })
    }
    start() {
        this.app.listen(8282)
    }
}

module.exports = dashboard;