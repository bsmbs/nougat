import { RichEmbed } from 'discord.js';

export default function check(message, client, mode)  {
    if (mode == 0) var klient = message.guild.members.get(client.user.id);
    if (mode == 1) var klient = message.guild.members.get(message.author.id);
    let embeded = new RichEmbed()
    .setAuthor('Nougat', 'https://cdn.discordapp.com/avatars/429587398511427584/d72e2f45262f7f7bdf956df2270752e3.jpg?size=1024')
    .setColor(0x123456);

    if (mode == 0) embeded.setTitle("Sprawdzanie uprawnień bota");
    if (mode == 1) embeded.setTitle("Sprawdzanie twoich uprawnień...");

    let ok = "\✅";
    let nieok = "\❌";

    if(klient.hasPermission("MANAGE_MESSAGES")) {
        embeded.addField("Zarządzanie wiadomościami", ok, true);
    } else {
        embeded.addField("Zarządzanie wiadomościami", nieok, true);
    }

    if(klient.hasPermission("CHANGE_NICKNAME")) {
        embeded.addField("Zmiana nicku", ok, true);
    } else {
        embeded.addField("Zmiana nicku", nieok, true);
    }

    if(klient.hasPermission("KICK_MEMBERS")) {
        embeded.addField("Wyrzucanie", ok, true);
    } else {
        embeded.addField("Wyrzucanie", nieok, true);
    }

    message.channel.send({embed: embeded});
}