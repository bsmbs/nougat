import { RichEmbed, Message, Client } from 'discord.js';
import { Nougat } from '../../main/main';

export default function autorole(args, message: Message, client: Client) {
    if(message.guild.members.get(message.author.id).hasPermission("ADMINISTRATOR")) {
        let ranga = args.slice(0).join(" ");
        if(ranga.includes("usun")) {
            Nougat.Serwer.find({id: message.guild.id}, (err, dok) => {
                if(err) return;
                dok[0].autorola = undefined;
                dok[0].save();
                const ctsEmbed = new RichEmbed()
                        .setAuthor('Nougat - Autorole', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                        .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                        .setTitle('Wyłączono autorole');
                    message.channel.send({ embed: ctsEmbed })
            })
        } else if(ranga.length > 0) {
            if(message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) {
                if(message.guild.roles.find('name', ranga)) {
                    Nougat.Serwer.find({ id: message.guild.id }, (err, dok) => {
                        if(err) return;
                        dok[0].autorola = message.guild.roles.find('name', ranga).id;
                        dok[0].save();
                        const ctsEmbed = new RichEmbed()
                            .setAuthor('Nougat - Autorole', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                            .setTitle('Pomyślnie ustawiono');
                        message.channel.send({ embed: ctsEmbed })
                    })
                } else {
                    const ctsEmbed = new RichEmbed()
                        .setAuthor('Nougat - Autorole', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                        .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                        .setTitle('Nie znaleziono takiej roli!');
                    message.channel.send({ embed: ctsEmbed })
                }
            } else {
                const ctsEmbed = new RichEmbed()
                    .setAuthor('Nougat - Autorole', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle('Nie posiadam odpowiedniego uprawnienia: Zarządzanie rolami. Zobacz *check');
                message.channel.send({ embed: ctsEmbed })
            }
        } else {
            const ctsEmbed = new RichEmbed()
                .setAuthor('Nougat - Autorole', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .setTitle('Użycie komendy autorole')
                .setDescription("Autorole pozwala ustawić rolę, która otrzyma każdy kto wejdzie na serwer.\n`autorole <nazwa roli>`\nAby wyłączyć, wpisz `autorole usun`\nPamiętaj, aby rola ta była NIŻEJ od roli bota!");
            message.channel.send({ embed: ctsEmbed })
        }
    } else {
        const ctsEmbed = new RichEmbed()
            .setAuthor('Nougat - Autorole', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
            .setTitle('Nie posiadasz odpowiednich uprawnień.');
        message.channel.send({ embed: ctsEmbed })
    }
}