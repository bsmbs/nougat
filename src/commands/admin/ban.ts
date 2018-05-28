import { RichEmbed } from 'discord.js';
let config = require('../../../../settings.json')

export default function ban(args, message, client) {
        let pwd = args.slice(1).join(" ");
        if(message.guild.members.get(message.author.id).hasPermission("BAN_MEMBERS") &&
            message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) {
                if(message.mentions.members.first()) {
                    if(message.member.roles.sort().first().calculatedPosition > message.mentions.members.first().roles.sort().first().calculatedPosition) {
                        const banEmbed = new RichEmbed()
                            .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d72e2f45262f7f7bdf956df2270752e3.jpg?size=1024')
                            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                            .setTitle('Zbanowano');
                        message.channel.send({
                            embed: banEmbed
                        });

                        if(pwd.length > 0) {
                            message.mentions.members.first().ban(pwd);
                            const baneEmbed = new RichEmbed()
                                .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d72e2f45262f7f7bdf956df2270752e3.jpg?size=1024')
                                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                                .setTitle('Zostałeś zbanowany na serwerze ' + message.guild.name)
                                .setDescription('Za: ' + pwd);
                            message.channel.send({
                                embed: baneEmbed
                            });
                            message.mentions.members.first().send("zostałeś zbanowany");
                        } else message.mentions.members.first().ban();
                    } else {
                        const errEmbed = new RichEmbed()
                            .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d72e2f45262f7f7bdf956df2270752e3.jpg?size=1024')
                            .setColor(0xC62828)
                            .setTitle('Użytkownik którego chcesz zbanować ma rolę większą lub równą twojej');
                        message.channel.send({
                            embed: errEmbed
                        });
                    }
                }
            } else {
                const errEmbed = new RichEmbed()
                    .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d72e2f45262f7f7bdf956df2270752e3.jpg?size=1024')
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle('ja albo ty nie może zbanować');
                message.channel.send({
                    embed: errEmbed
                });
            }
        }