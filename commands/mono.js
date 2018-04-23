exports.run = (message, Discord) => {
    const imgEmbed = new Discord.RichEmbed()
        .setAuthor('MonoDevelop', 'https://papryka.pro/img/monodev.png')
        .setImage('https://papryka.pro/img/monodev.png');
    message.channel.send({
        embed: imgEmbed
    });
}