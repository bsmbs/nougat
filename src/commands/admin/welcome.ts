import { RichEmbed, Message, Client } from 'discord.js';
import { Nougat } from '../../main/main';

export default function welcome(args, message: Message) {
    if(message.guild.members.get(message.author.id).hasPermission("ADMINISTRATOR")) {
        let msg = args.slice(0).join(" ");
        Nougat.Serwer.findOne({id: message.guild.id}, (err, gds) => {
            if(err) return;
            if(msg.includes("/wylacz")) {
                gds.welcome = null;
                gds.save();
                const ctsEmbed = new RichEmbed()
                    .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle('Usunięto wiadomość powitalną');
                message.channel.send({ embed: ctsEmbed })
            } else if (msg.length > 1) {
                gds.welcome = msg;
                gds.save();
                const ctsEmbed = new RichEmbed()
                    .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle('Ustawiono nową wiadomość powitalną');
                message.channel.send({ embed: ctsEmbed })
            } else {
                const ctsEmbed = new RichEmbed()
                    .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle('Aktualna wiadomośc powitalna')
                    .setDescription(gds.welcome)
                    .addField("Aby ustawić nową wiadomośc powitalną", "welcome <wiadomosc powitalna>")
                    .addField("Aby wyłączyć", "welcome /wylacz")
                message.channel.send({ embed: ctsEmbed })
            }
        })
    } else {
        const ctsEmbed = new RichEmbed()
        .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
        .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
        .setTitle('Nie posiadasz odpowiednich uprawnień: Administator');
        message.channel.send({ embed: ctsEmbed })
    }
}