import { Nougat } from '../main/main';

export function zakazane(message) {
    Nougat.Serwer.find({
        id: message.guild.id
    }, (err, guds) => {
        if(guds.length) {
            try {
                guds[0].zakazane.forEach((ss) => {
                    if(message.content.toLowerCase().includes(ss)) {
                        message.delete().catch(() => {
                            // moze kiedys wysylac na kanal logow
                        })
                        let Exception = {};
                        throw Exception;
                    }
                })
            } catch(e) {
                // nie ma
            }
        }
    })
}