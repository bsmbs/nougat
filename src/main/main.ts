import * as Discord from 'discord.js';
import * as Mongo from 'mongoose';
import * as ai from 'mongoose-auto-increment';
import { handluj } from './handler';
import { serwerm } from '../modules/serwer';
import { punkty } from '../modules/punkty';
import { ready } from './ready';
import { check } from './check';
import { zakazane } from '../modules/zakazane';
import { onJoin } from '../modules/autoroleService';

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
        }})
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
        this.client.login(this.config.token);
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
        this.client.on('guildMemberAdd', member => onJoin(member))
        this.client.on("message", message => {
            if(message.author.bot) return;
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
            serwerm(message.guild, 0);
        }
    }
}