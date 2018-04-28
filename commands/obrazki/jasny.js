exports.run = (message, Discord, Jimp) => {
    if(message.attachments.first()) {
        message.channel.send('Chwileczkę...');
        Jimp.read(message.attachments.first().url, function(err, obrazek) {
            if (err) throw err;
            obrazek.color([
                {apply: 'lighten', params: [ 30 ]}
            ]).getBuffer(Jimp.AUTO, function(err, buf) {
                if (err) return;
                message.channel.send({files: [buf]})
            })
        })
    }
}