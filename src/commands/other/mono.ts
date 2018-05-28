import { RichEmbed } from 'discord.js';
export default function mono(message) {
    const imgEmbed = new RichEmbed()
        .setAuthor('MonoDevelop', 'https://papryka.pro/img/monodev.png')
        .setImage('https://papryka.pro/img/monodev.png');
    message.channel.send({
        embed: imgEmbed
    });
}