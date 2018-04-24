exports.run = (args, message, Discord) => {
    let powod = args.slice(1).join(" ");
    let ofiara = message.mentions.members.first();
    if(typeof ofiara == 'undefined') {
        message.channel.send("Poprawne użycie: `warn <kogo> <powod>")
    } else {
    if(message.guild.members.get(message.author.id).hasPermission("KICK_MEMBERS")) {
        const warnSEmbed = new Discord.RichEmbed()
        .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
        .setTitle("Ostrzeżono użytkownika pomyślnie!")
        .setColor(0x198c41)
        message.channel.send({
            embed: warnSEmbed
        })
        const warnAEmbed = new Discord.RichEmbed()
        .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
        .setTitle("Zostałeś ostrzeżony na serwerze "+message.guild.name)
        .setDescription("Powód: "+powod)
        .setColor(0x198c41)
        message.mentions.members.first().send({
            embed: warnAEmbed
        })
    } else {
        message.channel.send("Nie masz uprawnień.")
    }
    }
}