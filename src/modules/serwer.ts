import { Nougat } from '../main/main';

export function serwerm(guild, typ) {
    Nougat.Serwer.find({id: guild.id}, (err, guds) => {
        if(guds.length) {
            if (typ == 0) guds[0].msgCount++;
            if (typ == 1) guds[0].nougatCount++;
            guds[0].save();
        } else {
            let nowySerwer = new Nougat.Serwer({
                id: guild.id,
                nougatCount: 0,
                msgCount: 0,
            });
            nowySerwer.save();
        }
    })
}