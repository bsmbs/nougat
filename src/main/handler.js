module.exports = (message, config, Discord, Prodkt, Uzytnik, kround, rp, Jimp, pozwij, sell, client, Serwer) => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase(); // wycinanie komendy i argumentow
    const n = require('./loader');

    switch(command) {
        // takie rozne
        case "pozwij":
            // komenda pozwij inicjująca tryb pozywania
            n.pozwij(message, pozwij.mode, pozwij.modev);
            break;
        case "help":
            // lista komend
            n.help(message, Discord, config.prefix, config.host);
            break;
        case "git":
        case "github":
        case "autor":
            n.git(message, Discord)
            break;
        case "8pilka":
            n.pilka(args, message, Discord)
            break;
        case "odwroc":
            n.odwroc(args, message);
            break;
        case "ciastko":
            n.ciastko(message, client);
            break;
        case "yt":
            n.yt(args, message, Discord, rp, config.ytapi);
            break;
        case "userinfo":
            n.userinfo(args, message, Discord);
            break;
        case "statek":
            n.statek(message, client);
            break;
        case "sms":
            n.sms(args, message, Discord);
            break;
        case "mono":
            n.mono(message, Discord);
            break;
        case "staty":
            n.staty(message, Discord, Serwer, message.guild);
            break;
        case "wybierz":
            n.wybierz(args, message, Discord, config);
            break;
            // ekonomia
        case "zaplac":
            n.zaplac(args, message, Discord, Uzytnik);
            break;
        case "bal":
        case "money":
        case "punkty":
        case "hajs":
            n.hajs(args, message, Discord, Uzytnik, config.id);
            break;
        case "biedronka":
            n.biedronka(message, Discord, Prodkt, Uzytnik, config.prefix);
            break;
        case "kup":
            n.kup(args, message, Discord, Prodkt, Uzytnik, kround);
            break;
        case "sprzedaj":
            n.sprzedajm(message, Discord, sell.mode, sell.modev);
            break;
        case "check":
            n.check(message, Discord, client, 0);
            break;
        case "checkme":
            n.check(message, Discord, client, 1);
            break;
            // administracyjne
        case "nazwa":
            n.nazwa(args, message, Discord, client, config);
            break;
        case "warn":
            n.warn(args, message, Discord);
            break;
        case "czysc":
            n.czysc(args, message, Discord, client);
            break;
            // obrazki
        case "kolory":
            n.odwrocKolory(args, message, Discord, Jimp);
            break;
        case "rozjasnij":
            n.jasny(args, message, Discord, Jimp);
            break;
        case "sepia":
            n.sepia(args, message, Discord, Jimp);
            break;
        case "przekrec":
            n.przekrec(args, message, Discord, Jimp);
            break;
    }
    //n.sprzedaj(message, Discord, Prodkt, sprzedajnazwa, sprzedajmode, sprzedajmodev, sprzedajcena, sprzedajzaw);
    //n.sad(message, Discord, pozwij.mode, pozwij.modev);
}