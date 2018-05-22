module.exports = (message, Discord, Serwer) => {
    Serwer.find({
        id: message.guild.id
    }, (err, guds) => {
        if(guds.length) {
            try {
                guds[0].zakazane.forEach((ss) => {
                    if(message.content.includes(ss)) {
                        message.delete().catch(() => {
                            // moze kiedys wysylac na kanal logow
                        })
                        let Exception = {};
                        throw new Exception;
                    }
                })
            } catch(e) {
                // tego slowa nie ma jest spoko elo
            }
        }
    })
}