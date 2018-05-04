exports.run = (message, Uzytnik) => {
    // tutaj kod z hajsikiem
    Uzytnik.find({
        uid: message.author.id
    }, function(err, uzyt) {
        if(uzyt.length) {
            // przyznaj HAJS ZA PISANKO
            if(uzyt[0].zajety+60 < (new Date()).getTime()/1000) { // jeżeli od ostatniej wiadomosci minelo 60 sekund
                console.log((new Date()).getTime()/1000)
                // uzyt[0].zajety = true;
                var is = Math.floor((Math.random() * 10) + 0);
                uzyt[0].hajs += is;
                uzyt[0].zajety = (new Date()).getTime()/1000;
                uzyt[0].save();
            } else if (uzyt[0].zajety == true || uzyt[0].zajety == false) { // migracja ze starego systemu
                uzyt[0].zajety = (new Date()).getTime()/1000;
                uzyt[0].save();
            } else { // jezeli od ostatniej wiadomosci nie minelo 60 sekund
                console.log(uzyt[0].zajety)
                console.log((new Date()).getTime()/1000)
            }
        } else {
            let nowyUzytnik = new Uzytnik({
                uid: message.author.id,
                hajs: 0,
                nick: message.author.username,
                zajety: (new Date()).getTime()/1000
            });
            nowyUzytnik.save();
            // funkcja zapisujaca
        }
    });
}