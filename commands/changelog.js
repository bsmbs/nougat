exports.run = (message, Discord) => {
    const changeEmbed = new Discord.RichEmbed()
            .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
            .setTitle("Changelog wersji 2.3")
            .setDescription("**Najważniejsze**\nNowa komenda `staty`\n\n**Dodano komendy**\nwarn, git, changelog, staty\n\nWięcej informacji o Nougacie: `help` oraz `git`");
    message.channel.send({embed: changeEmbed})
}