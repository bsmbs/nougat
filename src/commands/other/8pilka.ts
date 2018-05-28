import { RichEmbed } from 'discord.js';

export default function pilka(args, message) {
    // 8ball
    let text = args.slice(0).join(" ");
    let is = Math.floor((Math.random() * 6) + 0);
    let odpowiedzi = ['Raczej nie!', 'Oczywiście!', 'Ty no nie wiem', 'eee papryka', 'Xiaomi lepsze', 'Jak najbardziej', 'Hehe nie'];
    if(text.toLowerCase().includes("xiaomi")) is = 4; //jesli pytanie zawiera xiaomi, zawsze odpowiadaj xiaomi lepsze
    const mbed = new RichEmbed()
        .setAuthor("Nougat")
        .setTitle(text)
        .setColor(0x198c41)
        .setDescription(odpowiedzi[is]);
    message.channel.send({
        embed: mbed
    })
}
