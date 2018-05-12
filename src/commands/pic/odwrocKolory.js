exports.run = (args, message, Discord, Jimp) => {
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
            obrazek.invert().getBuffer(Jimp.AUTO, function(err, buf) {
                if (err) return;
                message.channel.send({files: [buf]})
            })
        })
}