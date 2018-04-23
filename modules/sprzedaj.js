exports.run = (message, Discord, Prodkt, sprzedajnazwa, sprzedajmode, sprzedajmodev, sprzedajcena, sprzedajzaw) => {

    if (!message.guild) {
        if (sprzedajmode[message.author.id] == true) {
            if (sprzedajmodev[message.author.id] == 1 && message.content && message.content.length < 25 && !message.content.includes('http') && !message.content.includes('discord') && !message.content.includes('*') && !message.content.includes('`') && !message.content.includes('~')) {
                sprzedajnazwa[message.author.id] = message.content;
                message.author.send('Dobra, teraz podaj cenę w bitcoinach. Maksymalna to 500.');
                sprzedajmodev[message.author.id] = 2;
            } else if (sprzedajmodev[message.author.id] == 2) {
                if (Number.isInteger(Number(message.content)) && Number(message.content) <= 500 && Number(message.content) > 0) {
                    sprzedajcena[message.author.id] = message.content;
                    message.author.send('Dobra! A teraz co dokładnie chcesz sprzedać? Może to być tekst lub link (może prowadzić do obrazka)');
                    sprzedajmodev[message.author.id] = 3;
                } else {
                    message.author.send('Nieprawidłowa liczba. Musi być całkowita - spróbuj jeszcze raz.');
                }
            } else if (sprzedajmodev[message.author.id] == 3) {
                if (message.content.includes("discord")) {
                    message.author.send('Spróbuj jeszcze raz.')
                } else {
                    sprzedajzaw[message.author.id] = message.content;
                    const sprawdzEmbed = new Discord.RichEmbed()
                        .setAuthor('Nougat - Biedronka', 'https://pbs.twimg.com/profile_images/3578001181/990ad36a51b8e483cde968adbb53df5a_400x400.png')
                        .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                        .setTitle('Czy wszystko się zgadza i chcesz wystawić? Tak/nie')
                        .addField('Nazwa', sprzedajnazwa[message.author.id])
                        .addField('Cena', sprzedajcena[message.author.id] + ' BTC')
                        .addField('Itemek', sprzedajzaw[message.author.id]);
                    message.author.send({
                        embed: sprawdzEmbed
                    });

                    sprzedajmodev[message.author.id] = 4;
                }
            } else if (sprzedajmodev[message.author.id] == 4) {
                if (message.content.toLowerCase().includes("tak")) {
                    // hehe mamy produkt
                    sprzedajmodev[message.author.id] = null;
                    sprzedajmode[message.author.id] = null;

                    message.channel.send('Wystawiono!');
                    let nowyProdukt = new Prodkt({
                        name: sprzedajnazwa[message.author.id],
                        cena: sprzedajcena[message.author.id],
                        zaw: sprzedajzaw[message.author.id],
                        usid: message.author.id
                    });

                    nowyProdukt.save();
                } else if (message.content.toLowerCase().includes("nie")) {
                    message.author.send("No to nie");
                    sprzedajmodev[message.author.id] = null;
                    sprzedajmode[message.author.id] = null;
                } else {
                    message.author.send('No ja nie rozumiem!');
                }
            }
        }
    }
}