exports.run = (args, message, Discord, client) => {
    let count = isNaN(parseInt(args[0])) ? 0 : parseInt(args[0])
    if(message.guild.members
        .get(client.user.id)
        .hasPermission("MANAGE_MESSAGES") &&
        message.guild.members
        .get(message.author.id)
        .hasPermission("MANAGE_MESSAGES")) {
        if(count > 100 || count < 0 || isNaN(parseInt(args[0]))) {
            const errEmbed = new Discord.RichEmbed()
            .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
            .setColor(0xC62828)
            .setTitle('Można jednocześnie skasować maksymalnie 100 wiadomości.');
            message.channel.send({embed: errEmbed});
        } else {
            message.channel.fetchMessages({
                limit: count
            }).then(msgs =>
                message.channel.bulkDelete(msgs));
        }
    } else {
        const errEmbed = new Discord.RichEmbed()
        .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
        .setColor(0xC62828)
        .setTitle('Ktoś tu nie ma odpowiednich uprawnień.')
        .setDescription("Sprawdź to komendą `check` dla uprawnień bota i `checkme` dla twoich uprawnień.\nPotrzebne: Zarządzanie wiadomościami")
        message.channel.send({embed: errEmbed});
    }

}