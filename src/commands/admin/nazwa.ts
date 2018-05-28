import { RichEmbed } from 'discord.js';
let config = require('../../../../settings.json')

export default function nazwa(args, message, client) {
    let nowanazwa = args.slice(0).join(" ");
    if(message.guild.members.get(message.author.id).hasPermission("MANAGE_NICKNAMES") || message.author.id == config.id) {
        if(message.guild.members.get(client.user.id).hasPermission("CHANGE_NICKNAME")) {
            message.guild.members.get(client.user.id).setNickname(nowanazwa);
            const successEmbed = new RichEmbed()
                .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d72e2f45262f7f7bdf956df2270752e3.jpg?size=1024')
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .setTitle('Zmieniono!');
            message.channel.send({
                embed: successEmbed
            });
            
        } else {
            const errEmbed = new RichEmbed()
                .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d72e2f45262f7f7bdf956df2270752e3.jpg?size=1024')
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .setTitle('Nie mam permisji do zmiany sobie nicku!');
            message.channel.send({
                embed: errEmbed
            });
        }
    } else {
        const lamEmbed = new RichEmbed()
            .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d72e2f45262f7f7bdf956df2270752e3.jpg?size=1024')
            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
            .setTitle('Drogi użytkownku, potrzebujesz uprawnienia do zmiany innym nicków aby zmienić mi nick!')
            .setDescription('Jest to jedynie zabezpieczenie');
        message.channel.send({
            embed: lamEmbed
        });
    }
}