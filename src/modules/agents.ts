import { Message } from 'discord.js';
import { Nougat } from '../main/main';
let config = require('../../../settings.json')

export function agents(message: Message) {
    if((config.agents.indexOf(message.author.id) != -1) || (message.author.id == config.id)) {
        let msg = message.content.split(" ");
        console.dir(msg);
        if(msg[0] == "*a") {
            switch(msg[1]) {
                case "btc":
                    let abf = message.guild.members.get(msg[2]);
                    if(abf) {
                        Nougat.Uzytnik.find({uid: abf.id}, (err, dak) => {
                            if(err) return;
                            if(dak.length) {
                                dak[0].hajs += Number(msg[3]);
                                dak[0].save();
                            }
                        })
                    }
                    break;
            }
        }
    }
}