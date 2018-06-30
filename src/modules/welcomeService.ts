import { GuildMember, RichEmbed } from "discord.js";
import { Nougat } from '../main/main';
import { isNullOrUndefined } from "util";

export function welcomeService(member: GuildMember) {
    Nougat.Serwer.findOne({id: member.guild.id}, (err, gds) => {
        if(!isNullOrUndefined(gds.welcome)) {
            if (err) return;
            let aembed = new RichEmbed()
            .setAuthor('Wiadomość powitalna', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
            .setDescription(gds.welcome);
            member.send({embed: aembed});
        }
    })
}