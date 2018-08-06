import { getfoto } from "./getfoto";

const Jimp = require('jimp');

export default function przekrec(args, message) {
    getfoto(message, args)
    .then(pic => {
        message.channel.send('Chwileczkę...');
        Jimp.read(pic, function(err, obrazek) {
            if (err) return;
            obrazek.color([{apply: 'hue', params: [120]}]).getBuffer(Jimp.AUTO, function(err, buf) {
                if (err) return;
                message.channel.send({files: [buf]}).catch((e) => {
                    message.channel.send("Nie udało się wysłać obrazka, prawdopodobnie bot nie ma do tego uprawnień.")
                })
            })
        })
    })
    .catch(err => message.channel.send(err))
        
    }