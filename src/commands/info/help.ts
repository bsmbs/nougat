import { RichEmbed, Message } from 'discord.js';
let config = require('../../../../settings.json')

export default function help(message: Message) {
    let color = (Math.random() * 0xFFFFFF << 0);
    const pomoc = new RichEmbed()
        .setAuthor("Nougat - Prefix: " + config.prefix, 'https://images-ext-2.discordapp.net/external/fkYtVmwzpOiB4iQufUQwn2m3doNs-_Aa51jOM6HEHDU/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/429707708074164246/d829eb3c8594727981b8c80699285479.png?width=80&height=80')
        .setColor(color.toString(16))
        .setTitle("https://pizza61.github.io/nougat")
        .addField('I n t e r a k t y w n e', '`pozwij`, `sprzedaj`')
        .addField('Ekonomia', '`zaplac <osoba> <kwota>`, `kup <id>`, `biedronka`, `hajs`')
        .addField('Zabawa', '`8pilka <zapytanie>`, `odwroc <tekst do odwrocenia>`, `ciastko`, `statek <pierwszy> <drugi>`, `mono`, `wybierz <co wybrac oddzielone |>`')
        .addField('Społecznościowe', '`sms <osoba> <wiadomosc>`')
        .addField('Informacja', '`yt <nazwa kanalu>`, `userinfo [uzytkownik]`, `git`, `check`, `checkme`')
        .addField('Obrazki', 'Do każdej wiadomości z komendą dołącz obrazek: `kolory`, `rozjasnij`, `sepia`, `przekrec`')
        .addField('Administracja', '`nazwa <nowa nazwa bota>`, `warn <uzytkownik> [powod]`, `czysc <ilosc wiadomosci>`, `zakazane`')
        .setFooter('Nougat v3.0 (28.05.2018) by Pizza, hostuje '+config.host)
    message.author.send({
        embed: pomoc
    })
}

/*exports.run = (message, Discord, prefix, hostuje) => {
   
}*/