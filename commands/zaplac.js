exports.run = (args, message, Discord, Uzytnik) => {
    let komu = message.mentions.members.first();
    let ilosc = args.slice(1).join(" ");
    if(typeof komu == 'undefined' || typeof ilosc == 'undefined' || komu.id == message.author.id) {
        const errEmbed = new Discord.RichEmbed()
            .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
            .setTitle('Poprawne użycie to: `*zaplac <ping komu> <kwota w bitcoinach>');
        message.channel.send({
            embed: errEmbed
        });
        return;
    }
    if(ilosc < 0) {
        message.channel.send('Nie dla psa');
    } else {
        Uzytnik.find({
            uid: message.author.id
        }, function(err, tuzyt) {
            Uzytnik.find({
                uid: komu.id
            }, function(err, kuzyt) {
                if(tuzyt && kuzyt) {
                    if(tuzyt.length && kuzyt.length) {
                        if(tuzyt[0].hajs >= Number(ilosc)) {
                            console.log(tuzyt[0].hajs - Number(ilosc));
                            tuzyt[0].hajs = tuzyt[0].hajs - Number(ilosc);
                            kuzyt[0].hajs += Number(ilosc);
                            tuzyt[0].save();
                            kuzyt[0].save();
                            const wychodzacyEmbed = new Discord.RichEmbed()
                                .setAuthor('Nougat Pay \™', 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
                                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                                .setTitle('Gratulacje użytkowniku')
                                .addField('Wysłałeś', komu, true)
                                .addField('Bitcoinów', ilosc, true);
                            message.channel.send({
                                embed: wychodzacyEmbed
                            });

                            const przychodzacyEmbed = new Discord.RichEmbed()
                                .setAuthor('Nougat Pay \™', 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
                                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                                .setTitle('Gratulacje użytkowniku')
                                .addField('Dostałeś od', message.author, true)
                                .addField('Bitcoinów', ilosc, true)
                                .addField('Nowy stan konta', kuzyt[0].hajs);
                            komu.send({
                                embed: przychodzacyEmbed
                            });
                        } else {
                            message.channel.send('Nie masz tyle, biedaku!');
                        }
                    } else {
                        message.channel.send('Nie znaleziono użytkownika')
                    }
                }
            })
        })
    }
}