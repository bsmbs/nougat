import { Message } from 'discord.js';
import { Nougat } from './main';
import * as n from './loader';
let config = require('../../../settings.json')

export function handluj(message: Message, pozwij, sell, client) {
    const args = message.content.slice("*".length).trim().split(/ +/g);
    const command = args.shift().toLowerCase(); // wycinanie komendy i argumentow

    switch(command) {
        // admin
        case "autorole":
            n.autorole(args, message, client);
            break;
        case "cytaty":
            n.cytaty(args, message);
            break;
        case "czysc":
        case "purge":
        case "clear":
            n.czysc(args, message, client);
            break;
        case "nazwa":
            n.nazwa(args, message, client);
            break;
        /*case "lang":
            n.lang(args, message);
            break;*/
        case "warn":
            n.warn(args, message);
            break;
        // eco
        case "hajs":
            n.hajs(args, message);
            break;
        case "rank":
            n.rank(args, message);
            break;
        case "top":
            n.top(message, args);
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
        case "dashboard":
            n.dashboard(message);
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
        case "help":
            // lista komend
            n.help(message);
            // n.help(message, Discord, config.prefix, config.host);
            break;
        // inne
        case "8pilka":
            n.pilka(args, message);
            break;
        case "cookie":
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