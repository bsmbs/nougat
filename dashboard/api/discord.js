const config = require('../../settings.json')
const util = require("util");
const express = require('express');
const router = express.Router();
const cookie = require("cookie-parser");
const rp = require("request-promise");
const bodyParser = require("body-parser");
const CLIENT_ID = config.dashboard.id;
const CLIENT_SECRET = config.dashboard.secret;
const redirect = encodeURIComponent(config.dashboard.callback)

router.get('/login', (req, res) => {
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=identify guilds`);
})
router.get('/callback', (req, res) => {
    if(!req.query.code) throw new Error("NoCodeProvided");
    const code = req.query.code;
    const creds = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    rp({
            method: 'POST',
            uri: `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
            headers: {
                'Authorization': `Basic ${creds}`,
                'User-Agent': 'Discord-Bot Nougat v4.0'
            },
            json: true
        })
        .then((response) => {
            res.cookie('token', response.access_token, {
                maxAge: 1000 * 60 * 60 * 24 * 3
            })
            res.redirect(`/`);
        })
})

function getto(token) {
    return new Promise((resolve, reject) => {
        rp({
            method: 'GET',
            uri: `https://discordapp.com/api/users/@me`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'Discord-Bot Nougat v4.0'
            },
            json: true
        }).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err);
        })
    })
}

router.get('/getId', (req, res) => {
    getto(req.cookies.token)
        .then(resp => {
            res.send(resp.id)
        }).catch(err => {
            res.send(new Error(err.message))
        })
})

router.use(cookie())
router.get('/check', (req, res) => {
    if(!util.isUndefined(req.cookies)) {
        if(util.isUndefined(req.cookies.token)) {
            res.status(401)
            res.send({ status: "ERROR", message: "not logged in" });
        }
        rp("https://discordapp.com/api/users/@me", {
            headers: {
                Authorization: "Bearer " + req.cookies.token
            },
            json: true
        }).then(resp => {
            //console.log("respok")
            res.status(200)
            res.send({
                status: "INFO",
                message: "logged in",
                data: resp,
                guilds: req.djs.guilds.size,
                users: req.djs.users.size
            });
        }).catch(() => {
            //console.log("resp not ok");
            res.status(401)

        })
    } else {
        res.status(401)
        res.send({
            status: "ERROR",
            message: "not logged in"
        });
    }
})
router.get('/guilds', (req, res) => {
    if(!util.isUndefined(req.cookies)) {
        if(util.isUndefined(req.cookies.token)) return;
        rp("https://discordapp.com/api/users/@me/guilds", {
            headers: {
                Authorization: "Bearer " + req.cookies.token
            },
            json: true
        }).then(resp => {
            let objg = [];
            resp.forEach((srvv) => {
                if(req.djs.guilds.get(srvv.id)) {
                    objg.push(srvv)
                }
            })
            res.send(objg)
            /*res.send({
                status: "INFO",
                message: "OK",
                data: resp
            });*/
        }).catch(err => {
            throw new Error(err.message);
        })
    } else {
        throw new Error("Not logged in")
    }
})

router.get('/guild', (req, res) => {
    let dat = req.djs.guilds.get(req.query.id);
    res.send(dat.members.get(req.query.user))
})
router.get('/more', (req, res) => {
    getto(req.cookies.token)
        .then(user => {
            let usid = user.id
            req.uzytnik.find({}, (err, topa) => {
                if(err) throw new Error(err.message);
                if(req.query.guild) {
                    let arrtop = [];
                    let index = 0;
                    topa.forEach(user => {
                        let ta = user.serwery.find(x => x.id == req.query.guild)
                        if(index < 10) {
                            if(ta) {
                                index++;
                                arrtop.push({
                                    id: user.uid,
                                    dsc: req.djs.users.get(user.uid).discriminator,
                                    nick: user.nick,
                                    av: `https://cdn.discordapp.com/avatars/${user.uid}/${req.djs.users.get(user.uid).avatar}?size=64`,
                                    punkty: ta.punkty
                                })
                            }
                        }
                    })
                    arrtop.sort((a, b) => { return b.punkty - a.punkty });
                    if(arrtop.find(x => x.id == usid)) {
                        arrtop.forEach((item, index) => {
                            if(item.id == usid) {
                                res.send({
                                    arrtop: arrtop,
                                    odpowiedz: index + 1
                                })
                            }
                        })
                    } else {
                        res.send({
                            arrtop: arrtop,
                            odpowiedz: 'ostatnie'
                        })
                    }
                } else {
                    topa.forEach((item, index) => {
                        topa.sort((a, b) => { return b.hajs - a.hajs });
                        if(item.uid == usid) {
                            res.send({
                                odpowiedz: index + 1
                            })
                        }
                    });
                }
            })

        })
})

router.get('/administracja', (req, res) => {
    getto(req.cookies.token)
        .then(user => {
            if(req.djs.guilds.get(req.query.guild)) {
                if(req.djs.guilds.get(req.query.guild).ownerID == user.id) {
                    req.serwer.findOne({ id: req.query.guild }, (err, docs) => {
                        if(err) {
                            res.status(404);
                            return;
                        }
                        if(docs) {
                            let resp = {
                                id: docs.id,
                                welcome: docs.welcome,
                                zakazane: docs.zakazane
                            }
                            if(req.djs.guilds.get(req.query.guild).roles.get(docs.jailRola)) {
                                let jailrola = req.djs.guilds.get(req.query.guild).roles.get(docs.jailRola);
                                resp.jailrole = {
                                    id: jailrola.id,
                                    name: jailrola.name,
                                    color: jailrola.color.toString(16)
                                }
                            }
                            if(req.djs.guilds.get(req.query.guild).roles.get(docs.autorola)) {
                                let autorola = req.djs.guilds.get(req.query.guild).roles.get(docs.autorola);
                                resp.autorole = {
                                    id: autorola.id,
                                    name: autorola.name,
                                    color: autorola.color.toString(16)
                                }
                            }

                            res.send(resp)

                        } else {
                            res.status(404);
                            res.send("not found")
                        }
                    })
                } else {
                    res.status(403);
                    res.send("nieautoryzowany")
                }
            } else {
                res.status(404);
                res.send("not found")
            }
        })
})
router.post('/postguild', bodyParser.json(), (req, res) => {
    if(!req.body) {
        return res.sendStatus(400);
    }
    getto(req.cookies.token)
        .then(user => {
            if(req.djs.guilds.get(req.body.guild)) {
                if(req.djs.guilds.get(req.body.guild).ownerID == user.id) {
                    req.serwer.findOne({ id: req.body.guild }, (err, docs) => {
                        if(err || !docs) {
                            res.status(404);
                            res.send("Nie ma takiego serwera");
                            return;
                        }
                        if(docs) {
                            if(req.body.action == "dodaj") {
                                if(req.body.co == "zakazane") {
                                    // dodaj slowo do zakazanych\
                                    if(req.body.slowo.length < 255) {
                                        docs.zakazane.push(req.body.slowo.toLowerCase())
                                        docs.save();
                                        res.send({
                                            sukces: "dodano",
                                            nowa: docs.zakazane
                                        })
                                    } else {
                                        return res.sendStatus(413)
                                    }
                                } else {
                                    return res.sendStatus(400);
                                }
                            }
                            else if(req.body.action == "usun") {
                                if(req.body.co == "autorole") {
                                    docs.autorola = undefined;
                                    docs.save()
                                    res.send({
                                        sukces: "usunieto"
                                    })
                                } else if(req.body.co == "jailrole") {
                                    docs.jailRola = undefined;
                                    docs.save();
                                    res.send({
                                        sukces: "usunieto"
                                    })
                                } else if(req.body.co == "welcome") {
                                    docs.welcome = null;
                                    docs.save();
                                    res.send({
                                        sukces: "usunieto"
                                    })
                                } else if (req.body.co == "zakazane") {
                                    // usun slowo z zakazanych
                                    docs.zakazane.forEach(ss => {
                                        if(req.body.slowo.includes(ss)) {
                                            let indx = docs.zakazane.indexOf(ss);
                                            if(indx > -1) {
                                                docs.zakazane.splice(indx, 1);
                                                docs.save();
                                                return res.send({
                                                    sukces: "usunieto",
                                                    nowa: docs.zakazane
                                                })
                                            }
                                        }
                                    })
                                } else {
                                    return res.sendStatus(400);
                                }
                            } else if(req.body.action == "zmien") {
                                if(req.body.co == "welcome") {
                                    if(req.body.wiadomosc.length > 512) {
                                        return res.status(413)
                                    } else {
                                    docs.welcome = req.body.wiadomosc;
                                    docs.save()
                                    res.send({
                                        sukces: "usunieto",
                                        nowa: req.body.wiadomosc
                                    })
                                    }
                                } else {
                                    if(req.djs.guilds.get(req.body.guild).roles.find('name', req.body.rola)) {
                                        let tarola = req.djs.guilds.get(req.body.guild).roles.find('name', req.body.rola);
                                        if(req.body.co == "autorole") {
                                            docs.autorola = tarola.id;
                                            docs.save();
                                            res.send({
                                                id: tarola.id,
                                                name: tarola.name,
                                                color: tarola.color.toString(16)
                                            })
                                        } else if(req.body.co == "jailrole") {
                                            docs.jailRola = tarola.id;
                                            docs.save();
                                            res.send({
                                                id: tarola.id,
                                                name: tarola.name,
                                                color: tarola.color.toString(16)
                                            })
                                        } else {
                                            res.status(410);
                                            res.send({
                                                status: "nie znaleziono roli"
                                            });
                                        }
                                    } else {
                                        res.status(410);
                                        res.send({
                                            status: "nie znaleziono roli"
                                        });
                                    }
                                }
                            } else {
                                res.status(400);
                                res.send("brak akcji")
                            }
                        } else {
                            res.status(404);
                            res.send("nie znaleziono serwera")
                        }
                    })
                } else {
                    res.status(403);
                    res.send("nieautoryzowany")
                }
            } else {
                res.status(404);
                res.send("Nie ma takiego serwera")
            }
        })
})
router.get('/logout', (req, res) => {
    rp({
        method: 'POST',
        uri: 'https://discordapp.com/api/oauth2/token/revoke?token=' + req.cookies.token,
        headers: {
            'User-Agent': 'Discord-Bot Nougat v4.0'
        }
    })
    res.clearCookie('token');
    res.redirect('/')
})

module.exports = router;