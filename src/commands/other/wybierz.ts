let config = require('../../../../settings.json')

export default function wybierz(args, message) {
    let a = message.content.slice(config.prefix.length+7).trim().split("|")
    message.channel.send("Wybieram "+a[Math.floor((Math.random() * a.length) + 0)]);
}