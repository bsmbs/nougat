module.exports = class {
    constructor(config) {
        this.config = config;
    }
    init() {
        this.Discord = require("discord.js");
        this.client = new this.Discord.Client();
        this.req = require('request');
        this.rp = require('request-promise');
        this.mongoose = require('mongoose');
        this.mongooseAi = require('mongoose-auto-increment');
        this.Jimp = require('jimp');

        this.initMongo();
        this.punkty = require('../modules/punkty');
        this.serwerm = require('../modules/serwer');
        this.kround = require('../modules/round');
    }

    initMongo() {
        this.mongoose.connect('mongodb://' + this.config.mongo);
        this.db = this.mongoose.connection;
        this.mongooseAi.initialize(this.db);
        this.db.on('error', (err) => {
            throw new Error("Nie można się połączyć z bazą danych mongodb. Czy na pewno jest ona uruchomiona i poprawnie podana w pliku settings.json?\n" + err)
        });

        this.userSchema = this.mongoose.Schema({
            uid: String, // id discorda
            hajs: Number, // stan konta uzytkownika
            zajety: Number, // czas w ktorym ostatni raz uzytkownik dostal hajs
            nick: String, // nick
            pozwij: {
                mode: Boolean,
                modev: Number,
                powod: String,
                pozwany: String
            },
            sprzedaj: {
                mode: Boolean,
                modev: Number,
                nazwa: String,
                cena: Number,
                zaw: String,
            }
        });
        this.produktSchema = this.mongoose.Schema({
            name: String, // nazwa produktu
            cena: Number, // cena
            zaw: String, // zawartosc przedmiotu - moze to byc link, obrazek, tekst, ogolnie roznie.
            usid: String // id użytkownika wystawiającego
        });
        this.serwerSchema = this.mongoose.Schema({
            id: String,
            nougatCount: Number,
            msgCount: Number,
        })
        this.Uzytnik = this.mongoose.model('Uzytnik', this.userSchema);

        this.produktSchema.plugin(this.mongooseAi.plugin, 'Prodkt');
        this.Prodkt = this.mongoose.model('Prodkt', this.produktSchema);
        this.Serwer = this.mongoose.model('Serwer', this.serwerSchema);
    }
    start() {
        this.client.login(this.config.token);
        this.ready = require("./ready");
        this.handler = require("./handler");
        this.check = require("./check");

        this.client.on('ready', () => this.ready.run(this.client));

        let pozwij = {
            mode: [],
            modev: [],
            powod: null,
            pozwany: null
        }
        let sprzedaj = {
            mode: [],
            modev: [],
            nazwa: [],
            cena: [],
            zaw: []
        }
        this.client.on('message', message => {
            if(message.author.bot) return;
            this.dodajPunkty(message);
            if (message.content.startsWith(this.config.prefix)) {
                if (message.guild) this.serwerm.run(this.Serwer, message.guild, 1);
                this.handler(message, this.config, this.Discord, this.Prodkt, this.Uzytnik, this.kround, this.rp, this.Jimp, pozwij, sprzedaj, this.client);
            } else {
                this.check(message, this.Discord, pozwij, sprzedaj, this.Prodkt);
            }
        })
    }
    dodajPunkty(message) {
        if(message.guild) {
            this.punkty.run(message, this.Uzytnik)
            this.serwerm.run(this.Serwer, message.guild, 0)
        }
    }
}