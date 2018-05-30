import { RichEmbed } from 'discord.js';

export default function userinfo(args, message) {
    let usernazwa = args.slice(0).join(" ");
    if(usernazwa == '') {
        var uzytkownik = message.author;
    } else {
        var uzytkownik = message.mentions.members.first().user
    }
    let czas = new Date(uzytkownik.createdTimestamp);
    let status = 'Nieznany';
    switch(uzytkownik.presence.status) {
        case 'online':
            status = 'Dostępny'
            break;
        case 'offline':
            status = 'Niedostępny';
            break;
        case 'idle':
            status = 'zw';
            break;
        case 'dnd':
            status = 'Nie przeszkadzać';
            break;
    }
    const boxdel = new RichEmbed()
        .setAuthor('Nougat - user info', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
        .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
        .setThumbnail(uzytkownik.avatarURL)
        .setTitle(uzytkownik.username)
        .addField('Zarejestrowano', `${czas.getDate()}.${czas.getMonth()+1}.${czas.getFullYear()} ${czas.getHours()}:${czas.getMinutes()}`, true)
        .addField('Tag', uzytkownik.discriminator, true)
        .addField('Status', status, true);
    message.channel.send({
        embed: boxdel
    });
}