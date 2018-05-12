exports.run = (args, message, Discord, client) => {
    let nowanazwa = args.slice(0).join(" ");
    if(message.guild.members.get(message.author.id).hasPermission("MANAGE_NICKNAMES") || message.author.id == cidautora) {


        if(message.guild.members.get(client.user.id).hasPermission("CHANGE_NICKNAME")) {
            message.guild.members.get(client.user.id).setNickname(nowanazwa);
            const successEmbed = new Discord.RichEmbed()
                .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .setTitle('Zmieniono!');
            message.channel.send({
                embed: successEmbed
            });
        } else {
            const errEmbed = new Discord.RichEmbed()
                .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .setTitle('Nie mam permisji do zmiany sobie nicku!');
            message.channel.send({
                embed: errEmbed
            });
        }
    } else {
        const lamEmbed = new Discord.RichEmbed()
            .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
            .setTitle('Drogi użytkownku, potrzebujesz uprawnienia do zmiany innym nicków aby zmienić mi nick!')
            .setDescription('Jest to jedynie zabezpieczenie');
        message.channel.send({
            embed: lamEmbed
        });
    }
}