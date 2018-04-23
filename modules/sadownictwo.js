exports.run = (message, Discord, pozwijmode, pozwijmodev) => {
    if(pozwijmode[message.author.id] == true) {
        // pozwij mode etap 1: wychwytuje mention kogo chcesz pozwac i pyta o powod
        if(pozwijmodev[message.author.id] == 1) {
            if(message.mentions.members.first()) {
                pozwany = message.mentions.members.first();
                message.channel.send(`A więc pozywasz ${pozwany}. \nO co go pozywasz?`)
                    .then(() => {
                        pozwijmodev[message.author.id] = 2;
                    })
            } else if(message.content.includes("anuluj")) {
                message.channel.send("Anulowano.");
                pozwijmodev[message.author.id] = null;
                pozwijmode[message.author.id] = null;
            } else {
                message.channel.send('No kogo pozywasz Janusz, oznacz go nie wstydź się! Lub napisz anuluj, aby anulować pozywanie.');
            }
        }
        // pozwij mode etap 2: wyswietla dane i pyta o ich prawidlowosc
        else if(pozwijmodev[message.author.id] == 2) {
            if(typeof pozwany == 'undefined') return;
            powod = message.content;
            if(powod == "anuluj") {
                message.channel.send("Anulowano.")
                pozwijmodev[message.author.id] = null;
                pozwijmode[message.author.id] = null;
                return;
            }
            const embed = new Discord.RichEmbed()
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .setAuthor("Sadownictwo", "http://ro.com.pl/wp-content/uploads/2014/11/wesolowska.jpg")
                .setTitle(`${message.author.tag} pozywa ${pozwany.displayName}`)
                .setDescription(`Powód: ${powod}`)
                .setThumbnail('http://sadarbitrazowy.com.pl/img/mlotek.png')
                .addField('Wszystko się zgadza?', 'tak/nie');
            message.channel.send({
                    embed
                })
                .then(() => {
                    pozwijmodev[message.author.id] = 3;
                })
        }
        // pozwij mode etap 3: wychwytuje odpowiedz i w zaleznosci od niej pozywa i resetuje pozwijmode
        else if(pozwijmodev[message.author.id] == 3) {
            if(message.content.toLowerCase() == 'nie') {
                const embed = new Discord.RichEmbed()
                    .setAuthor("Sadownictwo", "http://ro.com.pl/wp-content/uploads/2014/11/wesolowska.jpg")
                    .setTitle('W takim razie nikogo nie pozywasz!')
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                message.channel.send({
                    embed: embed
                });
                pozwijmodev[message.author.id] = null;
                pozwijmode[message.author.id] = null;
            } else if(message.content.toLowerCase() == 'tak') {
                const embed = new Discord.RichEmbed()
                    .setAuthor("Sadownictwo", "http://ro.com.pl/wp-content/uploads/2014/11/wesolowska.jpg")
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle("Pomyślnie pozwałeś " + pozwany.displayName);
                message.channel.send({
                    embed: embed
                })
                const ofiara = new Discord.RichEmbed()
                    .setAuthor("Sadownictwo", "http://ro.com.pl/wp-content/uploads/2014/11/wesolowska.jpg")
                    .setTitle("Zostałeś pozwany przez " + message.author.tag)
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                    .addField('Serwer', message.guild.name);
                pozwany.send({
                    embed: ofiara
                });
                pozwijmodev[message.author.id] = null;
                pozwijmode[message.author.id] = null;
            } else {
                message.channel.send('Nie rozumiem!');
            }
        }
    }
}