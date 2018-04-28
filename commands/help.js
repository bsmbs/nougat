exports.run = (message, Discord, prefix, hostuje) => {
    let color = (Math.random() * 0xFFFFFF << 0);
    const pomoc = new Discord.RichEmbed()
        .setAuthor("Nougat - Prefix: " + prefix, 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
        .setColor(color.toString(16))
        .addField('I n t e r a k t y w n e', '`pozwij`, `sprzedaj`')
        .addField('Ekonomia', '`zaplac <osoba> <kwota>`, `kup <id>`, `biedronka`, `hajs`')
        .addField('Zabawa', '`8pilka <zapytanie>`, `odwroc <tekst do odwrocenia>`, `ciastko`, `statek <pierwszy> <drugi>`, `mono`')
        .addField('Społecznościowe', '`sms <osoba> <wiadomosc>`')
        .addField('Informacja', '`yt <nazwa kanalu>`, `userinfo [uzytkownik]`, `git`, `changelog`')
        .addField('Obrazki', 'Do każdej wiadomości z komendą dołącz obrazek: `kolory`, `rozjasnij`, `sepia`, `przekrec`')
        .addField('Administracja', '`nazwa <nowa nazwa bota>`, `warn <uzytkownik> [powod]`')
        .setFooter('Nougat v2.4 (28.04.2018) by Pizza, hostuje '+hostuje, 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
    message.channel.send({
        embed: pomoc
    })
}