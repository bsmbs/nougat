exports.run = (message, Discord, Serwer, guild) => {
    if (!message.guild) return;
    Serwer.find({id: guild.id}, (err, guds) => {
        if(guds.length) {
            const statyEmbed = new Discord.RichEmbed()
            .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
            .setTitle("Statystyki serwera "+guild.name)
            .addField("Ogólnie wiadomości (od dodania Nougata)", guds[0].msgCount, true)
            .addField("Wysłanych komend do Nougata", guds[0].nougatCount, true);
            message.channel.send({embed: statyEmbed})
        } else {
            message.channel.send("Wystąpił nieznany błąd. Spróbuj ponownie.")
        }
    })
}