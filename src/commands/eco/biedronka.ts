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
    } else if(typeof args[0] != 'undefined') {
        Nougat.Prodkt.findOne({ _id: args[0] }, (err, dok) => {
            if(err) return;
            if(!dok) return;
            const admEmbed = new RichEmbed()
                .setAuthor('Nougat - Biedronka', 'https://pbs.twimg.com/profile_images/3578001181/990ad36a51b8e483cde968adbb53df5a_400x400.png')
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .addField("Nazwa przedmiotu", dok.name)
                .addField("Cena", dok.cena+" BTC")
                if((config.mods.indexOf(message.author.id) != -1) || (message.author.id == config.id)) {
                    admEmbed.addField("Zawartość", dok.zaw)
                    admEmbed.addField("ID wstawiającego", dok.usid)
                    message.author.send(admEmbed);
                } else {
                    message.channel.send(admEmbed);
                }
        })
    } else {
        Nougat.Prodkt.find({}).sort({
            _id: -1
        }).exec(function(err, docs) {

            const biedraEmbed = new RichEmbed()
                .setAuthor('Nougat - Biedronka', 'https://pbs.twimg.com/profile_images/3578001181/990ad36a51b8e483cde968adbb53df5a_400x400.png')
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .setTitle(`Witaj w Biedronce! Wpisz ${config.prefix}kup <numer> aby coś kupić lub ${config.prefix}sprzedaj, aby sprzedać!`)
                .setDescription(stringb)


            Nougat.Uzytnik.find({
                uid: message.author.id
            }, function(err, uzyt) {
                if(uzyt.length) {
                    docs.forEach((produkt) => {
                        if(liczba < 10) {
                            let wynikor;
                            liczba++
                            if(produkt.cena > uzyt[0].hajs) wynikor = "Nie stać cię!";
                            else wynikor = "*kup " + produkt._id
                            biedraEmbed.addField(`${produkt._id}: ${produkt.name}`, "Cena: " + produkt.cena + " BTC, " + wynikor);
                            //liczba++;
                            //stringb += `\n${produkt._id}: **${produkt.name}** - ${produkt.cena} BTC`;
                        }
                    })
                    biedraEmbed.setFooter(`${message.author.username} - stan konta: ${uzyt[0].hajs} BTC`);
                    message.channel.send({
                        embed: biedraEmbed
                    });
                }
            })
        });
    }
}