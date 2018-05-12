exports.run = (message, client) => {
    let milosc = message.mentions.users.keyArray();
    if(typeof milosc[0] == 'undefined' || typeof milosc[1] == 'undefined') {
        message.channel.send('Prawidłowe użycie to: `*statek <pierwszy> <drugi>`');
        return;
    }
    let pierwszy = message.channel.send(client.users.find('id', milosc[0]).toString() + ' \♥ ' + client.users.find('id', milosc[1]).toString());
    let lols = Math.floor((Math.random() * 10) + 1);
    message.channel.send("\♥ sprawdzam...");
    setTimeout(() => {
        message.channel.send(lols + '0%');
    }, 1000)
}