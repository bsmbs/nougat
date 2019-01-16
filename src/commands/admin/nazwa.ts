import { RichEmbed } from 'discord.js';
import { errorEmbed } from '../../modules/errorEmbed';
let config = require('../../../../settings.json')

export default function nazwa(args, message, client) {
    let nowanazwa = args.slice(0).join(" ");
    if(message.guild.members.get(message.author.id).hasPermission("MANAGE_NICKNAMES") || message.author.id == config.id) {
        if(message.guild.members.get(client.user.id).hasPermission("CHANGE_NICKNAME")) {
            message.guild.members.get(client.user.id).setNickname(nowanazwa);
            const successEmbed = new RichEmbed()
                .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .setTitle('Zmieniono!');
            message.channel.send({
                embed: successEmbed
            });
        } else {
            // BOT NIE MA UPRAWNIEŃ
            message.channel.send({
                embed: errorEmbed("Bot nie ma uprawnień")
            });
        }
    } else {
        // UŻYTKOWNIK NIE MA UPRAWNIEŃ
        message.channel.send({
            embed: errorEmbed("Nie masz uprawnień")
        });
    }
}