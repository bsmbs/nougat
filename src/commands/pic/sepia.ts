const Jimp = require('jimp');

export default function sepia(args, message) {
    let link = args.slice(0).join(" ");
    if(message.attachments.first()) {
        var url = message.attachments.first().url
    } else {
        if (link == '') return;
        var url = link;
    }
        message.channel.send('Chwileczkę...');
        Jimp.read(url, function(err, obrazek) {
            if (err) return;
            obrazek.sepia().getBuffer(Jimp.AUTO, function(err, buf) {
                if (err) return;
                message.channel.send({files: [buf]}).catch((e) => {
                    message.channel.send("Nie udało się wysłać obrazka, prawdopodobnie bot nie ma do tego uprawnień.")
                })
            })
        })
}