import { RichEmbed, Message } from 'discord.js';
let config = require('../../../../settings.json')

export default function help(message: Message) {
    let color = 0x2f7d32;
    const pomoca = new RichEmbed()
    .setAuthor("Nougat - Prefix: " + config.prefix, 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
        .setColor(color.toString(16))
        .setTitle("Rozszerzona lista komend na: https://pizza61.github.io/nougat")
        .setDescription("Użycie: nazwa komendy <obowiązkowy argument|albo inny> [nieobowiazkowy argument]. \nPamiętaj, aby przed nazwą komendy umieścić prefix. \nUżycie komendy bez potrzebnych arg. może skutkować pojawieniem się wyjasnienia.")
        .setFooter('Nougat v3.0 (30.05.2018) by Pizza, hostuje '+config.host)

    const interaktywne = new RichEmbed()
        .setAuthor("Interaktywne i ekonomia", 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
        .setColor(0x9C27B0)
        .setDescription('**Interaktywne**: `pozwij`, `sprzedaj`\n`biedronka`, `hajs`, `kup <id>`, `zaplac <wzmianka> <liczba>`');
    
    const zabawa = new RichEmbed()
        .setAuthor("Info", 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
        .setColor(0xf47100)
        .setDescription('`8pilka <zapytanie>`, `ciastko`, `mono`, `odwroc <tekst>`, `sms <wzmianka> <wiadomosc>`, `statek <wzmianka> <wzmianka>`, `wybierz <oddzielone |>`')

    const info = new RichEmbed()
        .setAuthor("Zabawa", 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
        .setColor(0x2f7d32)
        .setDescription('`check`, `checkme`, `git`, `help`, `staty`, `userinfo <wzmianka>`, `yt <kanal>`')
  
    const pic = new RichEmbed()
        .setAuthor("Obrazki", 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
        .setColor(0x1E88E5)
        .setDescription('`kolory`, `rozjasnij`, `sepia`, `przekrec`')
        .setFooter("Do każdej komendy dołącz obrazek lub link do obrazka")

    const admin = new RichEmbed()
        .setAuthor("Administracja", 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
        .setColor(0xD32F2F)
        .setDescription("`autorole <nazwa roli|usun>`, `czysc <liczba wiadomosci>`, `nazwa <nowa nazwa bota>`, `warn <wzmianka> [powod]`, `zakazane`");
    
    /* const pomoc = new RichEmbed()
        .setAuthor("Nougat - Prefix: " + config.prefix, 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
        .setColor(color.toString(16))
        //.addField('I n t e r a k t y w n e', '`pozwij`, `sprzedaj`')
        .addField('Ekonomia', '`zaplac <osoba> <kwota>`, `kup <id>`, `biedronka`, `hajs`')
        .addField('Zabawa', '`8pilka <zapytanie>`, `odwroc <tekst do odwrocenia>`, `ciastko`, `statek <pierwszy> <drugi>`, `mono`, `wybierz <co wybrac oddzielone |>`')
        .addField('Społecznościowe', '`sms <osoba> <wiadomosc>`')
        .addField('Informacja', '`yt <nazwa kanalu>`, `userinfo [uzytkownik]`, `git`, `check`, `checkme`')
        .addField('Obrazki', 'Do każdej wiadomości z komendą dołącz obrazek: `kolory`, `rozjasnij`, `sepia`, `przekrec`')
        .addField('Administracja', '`nazwa <nowa nazwa bota>`, `warn <uzytkownik> [powod]`, `czysc <ilosc wiadomosci>`, `zakazane`, `autorole <nazwa roli|usun>`')
        .setFooter('Nougat v3.0 (30.05.2018) by Pizza, hostuje '+config.host) */
        message.author.send({embed: interaktywne})
        message.author.send({embed: zabawa})
        message.author.send({embed: info})
        message.author.send({embed: pic})
        message.author.send({embed: admin})
        message.author.send({embed: pomoca})
}

/*exports.run = (message, Discord, prefix, hostuje) => {
   
}*/