exports.run = (args, message, Discord) => {
    let usernazwa = args.slice(0).join(" ");
    if(usernazwa == '') {
        let uzytkownik = message.author;
    } else {
        let uzytkownik = message.mentions.members.first().user
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
    const boxdel = new Discord.RichEmbed()
        .setAuthor('Nougat - user info', 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
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