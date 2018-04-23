exports.run = (message, Uzytnik) => {
    // tutaj kod z hajsikiem
    Uzytnik.find({
        uid: message.author.id
    }, function(err, uzyt) {
        if(uzyt.length) {
            // przyznaj HAJS ZA PISANKO
            if(!uzyt[0].zajety) {
                uzyt[0].zajety = true;
                var is = Math.floor((Math.random() * 10) + 0);
                uzyt[0].hajs += is;
                uzyt[0].save();
                setTimeout(() => {
                    uzyt[0].zajety = false;
                    uzyt[0].save()
                }, 60000)
            } else {}
        } else {
            let nowyUzytnik = new Uzytnik({
                uid: message.author.id,
                hajs: 0,
                nick: message.author.username
            });
            nowyUzytnik.save();
            // funkcja zapisujaca
        }
    });
}