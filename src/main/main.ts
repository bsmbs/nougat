import * as Discord from 'discord.js';
import * as Mongo from 'mongoose';
import * as ai from 'mongoose-auto-increment';
import { handluj } from './handler';
import { serwerm } from '../modules/serwer';
import { punkty } from '../modules/punkty';
import { punktys } from '../modules/punktys';
import { ready } from './ready';
import { check } from './check';
import { zakazane } from '../modules/zakazane';
import { onMemberJoin, onBotJoin } from '../modules/onJoin';
import { agents } from '../modules/agents';
const dashboard = require('../../../dashboard/main')

export class Nougat {
    config: any;
    client: Discord.Client;
    db: Mongo.Connection;
    userSchema: any;
    produktSchema: any;
    serwerSchema: any;
    static Uzytnik: any;
    static Prodkt: any;
    static Serwer: any;

    constructor(config) {
        this.config = config;
    }

    public init() {
        this.client = new Discord.Client();
        this.initMongo();
    }
    initMongo() {
        Mongo.connect('mongodb://'+this.config.mongo)
        this.db = Mongo.connection;
        ai.initialize(this.db);
        this.db.on('error', (err) => {
            throw new Error("Nie można się połączyć z bazą danych mongodb");
        })
        this.userSchema = new Mongo.Schema({
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
                zaw: String
            },
            serwery: [{
                id: String,
                punkty: Number,
                zajety: Number
            }]
            })
        this.produktSchema = new Mongo.Schema({
            name: String, // nazwa produktu
            cena: Number, // cena
            zaw: String, // zawartosc przedmiotu - moze to byc link, obrazek, tekst, ogolnie roznie.
            usid: String // id użytkownika wystawiającego
        });
        this.serwerSchema = new Mongo.Schema({
            id: String,
            nougatCount: Number,
            msgCount: Number,
            welcome: String,
            zakazane: {
                type: Array,
                default: []
            },
            lang: String,
            jail: [{
                id: String,
                roles: [String]
            }],
            jailRola: String,
            autorola: String
        })

        Nougat.Uzytnik = Mongo.model('Uzytnik', this.userSchema);
        Nougat.Prodkt =  Mongo.model('Prodkt', this.produktSchema);
        Nougat.Serwer =  Mongo.model('Serwer', this.serwerSchema);
        this.produktSchema.plugin(ai.plugin, 'Prodkt');
    }

    start() {
        this.client.login(this.config.token).catch(err => {
            console.log(err)
        })

        const dshb = new dashboard(this.client, Nougat.Uzytnik, Nougat.Prodkt, Nougat.Serwer);
        dshb.init();
        dshb.start();
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
        this.client.on('ready', () => ready(this.client));
        this.client.on('guildMemberAdd', member => onMemberJoin(member));
        this.client.on('guildCreate', guild => onBotJoin(this.client, guild));
        this.client.on("message", message => {
            if(message.author.bot) {
                //agents(message);
                return;
            }
            this.dodajPunkty(message);
            if(message.content.startsWith(this.config.prefix)) {
                if (message.guild) {
                    serwerm(message.guild, 1);
                    /*Nougat.Serwer.find({id: message.guild.id}, (err, dcs) => {
                        if (err) return;
                        if(dcs[0].lang == 'en') {
                            handluj(message, pozwij, sprzedaj, this.client, en);
                        } else {
                            handluj(message, pozwij, sprzedaj, this.client, pl);
                        }
                    })*/
                }
                handluj(message, pozwij, sprzedaj, this.client);
            } else {
                check(message, pozwij, sprzedaj);
                if (message.guild) zakazane(message);
            }
        })
    }

    dodajPunkty(message) {
        if(message.guild) {
            punkty(message);
            punktys(message);
            serwerm(message.guild, 0);
        }
    }
}