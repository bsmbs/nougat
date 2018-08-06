const Jimp = require('jimp');
import {getfoto} from './getfoto';

export default function jasny(args, message) {
    getfoto(message, args)
    .then((pic) => {
        message.channel.send('Chwileczkę...');
        Jimp.read(pic, (err, obrazek) => {
            if (err) return;
            obrazek.color([
                {apply: 'lighten', params: [ 30 ]}
            ]).getBuffer(Jimp.AUTO, function(err, buf) {
                if (err) return;
                message.channel.send({files: [buf]}).catch((e) => {
                    message.channel.send("Nie udało się wysłać obrazka, prawdopodobnie bot nie ma do tego uprawnień.")
                })
            }) 
        })
    })
    .catch(err => message.channel.send(err))
}