import { RichEmbed } from 'discord.js';
export default function sms(args, message) {
    let numer = message.mentions.members.first();
    let wiadomosc = args.slice(1).join(" ");
    if(typeof numer == 'undefined' || typeof wiadomosc == 'undefined') {
        const errEmbed = new RichEmbed()
            .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
            .setTitle('Poprawne użycie to: `*sms <ping komu> <wiadomosc dluga jak tylko zapragniesz>');
        message.channel.send({
            embed: errEmbed
        });
        return;
    }
    numer.send('Wiadomość przychodząca od ' + message.author + ': ' + wiadomosc)
        .catch(() => {
            message.channel.send("Nie udało się wysłać wiadomości :/");
        })
    message.channel.send('Leci wiadomość');
}