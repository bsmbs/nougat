import { RichEmbed } from 'discord.js';

export default function warn(args, message) {
    let powod = args.slice(1).join(" ");
    let ofiara = message.mentions.members.first();
    if(typeof ofiara == 'undefined') {
        message.channel.send("Poprawne użycie: `warn <kogo> <powod>")
    } else {
    if(message.guild.members.get(message.author.id).hasPermission("KICK_MEMBERS")) {
        const warnSEmbed = new RichEmbed()
        .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/d72e2f45262f7f7bdf956df2270752e3.jpg?size=1024')
        .setTitle("Ostrzeżono użytkownika pomyślnie!")
        .setColor(0x198c41)
        message.channel.send({
            embed: warnSEmbed
        })
        const warnAEmbed = new RichEmbed()
        .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/d72e2f45262f7f7bdf956df2270752e3.jpg?size=1024')
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