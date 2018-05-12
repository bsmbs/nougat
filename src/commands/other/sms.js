exports.run = (args, message, Discord) => {
    let numer = message.mentions.members.first();
    let wiadomosc = args.slice(1).join(" ");
    if(typeof numer == 'undefined' || typeof wiadomosc == 'undefined') {
        const errEmbed = new Discord.RichEmbed()
            .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
            .setTitle('Poprawne użycie to: `*sms <ping komu> <wiadomosc dluga jak tylko zapragniesz>');
        message.channel.send({
            embed: errEmbed
        });
        return;
    }
    numer.send('Wiadomość przychodząca od ' + message.author + ': ' + wiadomosc)
        .catch(() => {
            message.channel.send("Nie udało się wysłać wiadomości :/");
        })
    message.channel.send('Leci wiadomość');
}