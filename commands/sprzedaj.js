exports.run = (message, Discord, sprzedajmode, sprzedajmodev) => {
    message.channel.send("Napisałem do ciebie na pw - tam poprowadzę cię przez proces wystawiania przedmiotu.")
    message.author.send("Sprzedawanie polega na tym, że wystawiasz coś do *biedronka, a jak ktoś to kupi to dostajesz z tego od 0 do 100%!")
    message.author.send("Podaj nazwę przedmiotu, który chcesz sprzedać. Nie może być w nim linków!")
        .catch(() => {
            const errEmbed = new Discord.RichEmbed()
                .setAuthor('Nougat - Biedronka', 'https://pbs.twimg.com/profile_images/3578001181/990ad36a51b8e483cde968adbb53df5a_400x400.png')
                .setColor(0xF44336)
                .setTitle('Błąd')
                .setDescription('Nie można dotrzeć do ciebie. Może masz zablokowane wiadomości od nieznajomych, lub mnie zablokowałeś?');
            message.channel.send({
                embed: errEmbed
            })
        })
    sprzedajmode[message.author.id] = true;
    sprzedajmodev[message.author.id] = 1;
}