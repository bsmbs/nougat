import { RichEmbed, Message, DiscordAPIError } from 'discord.js';
import { Nougat } from '../../main/main';
let config = require('../../../../settings.json')

export default function biedronka(args, message: Message) {
    let stringb = "";
    let liczba = 0;

    if(args[0] == "usun") {
        if((config.mods.indexOf(message.author.id) != -1) || (message.author.id == config.id)) {
            if(args[1]) {
                let s = Number(args[1])
                message.channel.send(s);
                Nougat.Prodkt.findByIdAndRemove(args[1], (err, dab) => {
                    if(err) console.log(err);
                })
            }
        }
    } else if (args[0] == "zobacz") {
        if((config.mods.indexOf(message.author.id) != -1) || (message.author.id == config.id)) {
            if(args[1]) {
                Nougat.Prodkt.findOne({_id: args[1]}, (err, dok) => {
                    message.author.send({embed: new RichEmbed()
                        .setAuthor('Nougat - Moderacja Biedronki', 'https://pbs.twimg.com/profile_images/3578001181/990ad36a51b8e483cde968adbb53df5a_400x400.png')
                        .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                        .addField("Nazwa przedmiotu", dok.name)
                        .addField("Cena", dok.cena)
                        .addField("Zawartość", dok.zaw)
                        .addField("ID wstawiającego", dok.usid)
                    })
                })
            }
        }
    } else {
        Nougat.Prodkt.find({}).sort({
            _id: -1
        }).exec(function(err, docs) {
            docs.forEach((produkt) => {
                if(liczba < 10) {
                    liczba++;
                    stringb += `\n${produkt._id}: **${produkt.name}** - ${produkt.cena} BTC`;
                }
            })
            const biedraEmbed = new RichEmbed()
                .setAuthor('Nougat - Biedronka', 'https://pbs.twimg.com/profile_images/3578001181/990ad36a51b8e483cde968adbb53df5a_400x400.png')
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .setTitle(`Witaj w Biedronce! Wpisz ${config.prefix}kup <numer> aby coś kupić lub ${config.prefix}sprzedaj, aby sprzedać!`)
                .setDescription(stringb)
            Nougat.Uzytnik.find({
                uid: message.author.id
            }, function(err, uzyt) {
                if(uzyt.length) {
                    biedraEmbed.setFooter(`${message.author.username} - stan konta: ${uzyt[0].hajs} BTC`);
                    message.channel.send({
                        embed: biedraEmbed
                    });
                }
            })
        });
    }
}