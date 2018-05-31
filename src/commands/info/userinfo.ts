import { RichEmbed, User, GuildMember, Message } from 'discord.js';

export default function userinfo(args, message: Message) {
    if(!message.guild) return;
    let usernazwa = args.slice(0).join(" ");
    if(usernazwa == '') {
        var uzytkownik: User = message.author;
        var uzytkownikMem: GuildMember = message.member;
    } else {
        var uzytkownik: User = message.mentions.members.first().user;
        var uzytkownikMem: GuildMember = message.mentions.members.first();
    }
    let czas = new Date(uzytkownik.createdTimestamp);
    let czasDol = new Date(uzytkownikMem.joinedTimestamp);
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
        .addField('Status', status, true)
        .addField('Data dołączenia na serwer', `${czasDol.getDate()}.${czasDol.getMonth()+1}.${czasDol.getFullYear()} ${czasDol.getHours()}:${czasDol.getMinutes()}`,true)
        .addField('ID', uzytkownik.id, true)
        .addField('Role', uzytkownikMem.roles.array(), true)
        .addField('Link do avataru:', uzytkownik.avatarURL, false)
    message.channel.send({
        embed: boxdel
    });
}