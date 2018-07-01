import { RichEmbed, Message } from 'discord.js';
import { Nougat } from '../../main/main';

export default function top(message: Message) {
    Nougat.Uzytnik.find({}, (err, topa) => {
        if(!topa || err) return;
        topa.sort((a, b) => {return b.hajs-a.hajs});
        const bogatyEmbed = new RichEmbed()
        .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
        .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
        .setTitle('Top 10 najbogatszych ogólnie')
        
        topa.forEach((item, index) => {
            if(index < 10) {
                bogatyEmbed.addField(index+1+". "+item.nick, item.hajs, true);
            }
        });
        message.channel.send({embed: bogatyEmbed})
    })
}