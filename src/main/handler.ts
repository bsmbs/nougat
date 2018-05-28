import { Message } from 'discord.js';
import { Nougat } from './main';
import * as n from './loader';
let config = require('../../../settings.json')

export function handluj(message: Message, pozwij, sell, client) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase(); // wycinanie komendy i argumentow

    switch(command) {
        // admin
        case "ban":
            //n.ban(args, message, client);
            break;
        case "czysc":
            n.czysc(args, message, client);
            break;
        case "nazwa":
            n.nazwa(args, message, client);
            break;
        case "warn":
            n.warn(args, message);
            break;
        case "zakazane":
            n.zakazane(args, message);
            break;
        // eco
        case "biedronka":
            n.biedronka(message);
            break;
        case "hajs":
            n.hajs(args, message);
            break;
        case "kup":
            n.kup(args, message);
            break;
        case "sprzedaj":
            n.sprzedajc(message, sell.mode, sell.modev);
            break;
        case "zaplac":
            n.zaplac(args, message);
            break; 
        // info
        case "check":
            n.check(message, client, 0);
            break;
        case "checkme":
            n.check(message, client, 1);
            break;
        case "git":
            n.git(message);
            break;
        case "staty":
            n.staty(message);
            break;
        case "userinfo":
            n.userinfo(args, message);
            break;
        case "yt":
            n.yt(args, message);
            break;
        case "help":
            // lista komend
            n.help(message);
            // n.help(message, Discord, config.prefix, config.host);
            break;
        // inne
        case "8pilka":
            n.pilka(args, message);
            break;
        case "ciastko":
            n.ciastko(message, client);
            break;
        case "mono":
            n.mono(message);
            break;
        case "odwroc":
            n.odwroc(args, message);
            break;
        case "sms":
            n.sms(args, message);
            break;
        case "statek":
            n.statek(args, message);
            break;
        case "wybierz":
            n.wybierz(args, message);
            break;
        case "pozwij":
            // komenda pozwij inicjująca tryb pozywania
            n.pozwij(message, pozwij.mode, pozwij.modev);
            break;
        // pic
        case "jasny":
            n.jasny(args, message);
            break;
        case "kolory":
            n.odwrocKolory(args, message);
            break;
        case "przekrec":
            n.przekrec(args, message);
            break;
        case "sepia":
            n.sepia(args, message);
            break;
    }
}