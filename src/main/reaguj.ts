import { MessageReaction, User, Client, RichEmbed } from "discord.js";
import { Nougat } from "./main";

export function reaguj(listener: MessageReaction, user: User, client: Client) {
    if(listener.emoji.name == "⭐") {
        if(listener.count > 2) {
            Nougat.Serwer.findOne({id: listener.message.guild.id},
                function(err, guild) {
                    if (err) return;
                    if(guild.cytaty === null || guild.cytaty === undefined) {
                        // no nic
                    } else {
                        
                        let b = listener.message.guild.channels.find(c => c.id == guild.cytaty);
                        if (!b) {
                            console.log("kupa");
                            guild.cytaty = null;
                            guild.save();
                            return;
                        }
                        const wowMbed = new RichEmbed()
                        .setAuthor(user.username, user.avatarURL)
                        .setTitle("napisał w "+listener.message.channel.name)
                        .setDescription(listener.message.content)
                        .setTimestamp(new Date(listener.message.createdTimestamp))
                        .setColor(0x73cc2d)

                        b.send({embed: wowMbed})
                    }
                })
        }
    }
}