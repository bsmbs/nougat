import { RichEmbed } from 'discord.js';
import { errorEmbed } from '../../modules/errorEmbed';

export default function czysc(args, message, client) {
    let count = isNaN(parseInt(args[0])) ? 0 : parseInt(args[0])
    if(message.guild.members
        .get(client.user.id)
        .hasPermission("MANAGE_MESSAGES") &&
        message.guild.members
        .get(message.author.id)
        .hasPermission("MANAGE_MESSAGES")) {
        if(count > 100 || count < 0 || isNaN(parseInt(args[0]))) {
            const errEmbed = new RichEmbed()
            .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
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
        message.channel.send({embed: errorEmbed("Nie mam uprawnień albo ty nie masz")});
    }

}