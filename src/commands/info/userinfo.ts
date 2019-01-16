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
    let czasMi = "0" + czas.getMinutes();
    let czasMo = "0" + czas.getMonth()+1;

    let czasDol = new Date(uzytkownikMem.joinedTimestamp);
    let czasDolMi = "0" + czasDol.getMinutes();
    let czasDolMo = "0" + (czasDol.getMonth()+1);

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
        .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
        .setColor(0x128070)
        .setThumbnail(uzytkownik.avatarURL)
        .setTitle(uzytkownik.username)
        .addField('Zarejestrowano', `${czas.getDate()}.${czasMo.substr(-2)}.${czas.getFullYear()} ${czas.getHours()}:${czasMi.substr(-2)}`, true)
        .addField('Tag', uzytkownik.discriminator, true)
        .addField('Status', status, true)
        .addField('Data dołączenia na serwer', `${czasDol.getDate()}.${czasDolMo.substr(-2)}.${czasDol.getFullYear()} ${czasDol.getHours()}:${czasDolMi.substr(-2)}`,true)
        .addField('ID', uzytkownik.id, true)
        .addField('Role', uzytkownikMem.roles.array(), true)
        .addField('Link do avataru:', uzytkownik.avatarURL, false)
    message.channel.send({
        embed: boxdel
    });
}