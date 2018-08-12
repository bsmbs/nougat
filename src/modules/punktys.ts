import { Nougat } from '../main/main';
import { Message } from 'discord.js';

export function punktys(message: Message) {
    Nougat.Uzytnik.findOne({
        uid: message.author.id
    }, function(err, uzyt) {
        if(uzyt) {
            let objo = uzyt.serwery.find(sr => sr.id == message.guild.id)
            if(objo) {
                if(objo.zajety+60 < (new Date()).getTime()/1000) { // jeżeli od ostatniej wiadomosci minelo 60 sekund
                    // uzyt[0].zajety = true;
                    var is = Math.floor((Math.random() * 10) + 0);
                    objo.punkty += is;
                    objo.zajety = (new Date()).getTime()/1000;
                    uzyt.save();
                } else { // jezeli od ostatniej wiadomosci nie minelo 60 sekund
                }
            } else {
                // nie ma serwera, trzeba dodac
                console.log("mozliwe")
                uzyt.serwery.push({
                    id: message.guild.id,
                    punkty: 0,
                    zajety: 0
                })
                uzyt.save();
            }
        }
        // nie ma uzytkownika tym zajmuje sie inny skrypt
    })
}