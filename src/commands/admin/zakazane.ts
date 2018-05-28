import { RichEmbed } from 'discord.js';
import { Nougat } from '../../main/main';

export default function zakazane(args, message) {
    if(message.guild.members
        .get(message.author.id)
        .hasPermission("ADMINISTRATOR")) {
        switch(args[0]) {
            case "dodaj":
            case "add":
                let slowo = args.slice(1).join(" ");
                if(slowo.length > 1) {
                    Nougat.Serwer.find({
                        id: message.guild.id
                    }, (err, guds) => {
                        if(guds.length) {
                            guds[0].zakazane.push(slowo);
                            guds[0].save();
                            message.channel.send({
                                embed: new RichEmbed()
                                    .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
                                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                                    .setTitle("Dodano pomyślnie")
                            });
                        }
                    })
                }
                break;
            case "rm":
            case "usun":
            case "delete":
            case "del":
            case "remove":
                let slowoU = args.slice(1).join(" ");
                if(slowoU.length > 1) {
                    Nougat.Serwer.find({
                        id: message.guild.id
                    }, (err, guds) => {
                        if(guds.length) {
                            guds[0].zakazane.forEach((ss) => {
                                if(slowoU.includes(ss)) {
                                    let indx = guds[0].zakazane.indexOf(ss);
                                    if(indx > -1) {
                                        guds[0].zakazane.splice(indx, 1);
                                        guds[0].save();
                                        message.channel.send({
                                            embed: new RichEmbed()
                                                .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
                                                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                                                .setTitle("Usunięto pomyślnie")
                                        });
                                    }
                                } else {
                                    message.channel.send({
                                        embed: new RichEmbed()
                                            .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
                                            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                                            .setTitle("Nie znaleziono!")
                                    })
                                }
                            })
                        }
                    })
                }
                break;
            case "on":
                // wlacz
                break;
            case "off":
                // wylacz
                break;
            case "lista":
                Nougat.Serwer.find({
                    id: message.guild.id
                }, (err, guds) => {
                    if(guds.length) {
                        let listaSlow = "\n";
                        const listaEmbed = new RichEmbed()
                            .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
                            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                            .setTitle("Lista zakazanych słów na serwerze " + message.guild.name)
                        guds[0].zakazane.forEach((ss) => {
                            listaSlow += ss + "\n";
                        })
                        message.channel.send({
                            embed: listaEmbed.setDescription(listaSlow)
                        })
                    }
                })
                break;
            default:
                const helpEmbed = new RichEmbed()
                    .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128')
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle("Użycie komendy zakazane")
                    .setDescription(`Przeznaczona tylko dla osób z uprawnieniem \`Administrator\`
            \nzakazane **dodaj <wyraz>** - dodaje wyraz do zakazanych
            \nzakazane **usun <wyraz>** - usuwa wyraz z zakazanych
            \nzakazane **lista** - lista zakazanych`);
                message.channel.send({
                    embed: helpEmbed
                })
                break;
        }
    } else {
        message.channel.send("Potrzebne uprawnienie: administrator")
    }
}