import { GuildMember, RichEmbed } from 'discord.js';
import { Nougat } from '../main/main';

export function autoroleService(member: GuildMember) {
    Nougat.Serwer.find({id: member.guild.id}, (err, wyniki) => {
        if (err) return;
        if(typeof wyniki[0].autorola != 'undefined') {
            member.addRole(member.guild.roles.get(wyniki[0].autorola)).catch((e) => {
                const catchEmbed = new RichEmbed()
                .setAuthor('Nougat - Logi', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .setTitle(`Wystąpił błąd na twoim serwerze ${member.guild.name}`)
                .setDescription(`Treść błędu: ${e.message}\nps. najczęściej błędy Missing Permissions lub Access oznaczają, że rola bota jest niżej lub na równi z rolą automatyczną. **Bot musi być wyżej**. \nJeżeli błąd jest inny, skontaktuj się z twórcą bota (info komenda git)`);
                member.guild.owner.send({embed: catchEmbed});
                // tu logi
            })
        }
    })
}