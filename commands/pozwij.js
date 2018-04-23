exports.run = (message, pozwijmode, pozwijmodev) => {
    message.channel.send(`${message.author}, oznacz kogo chcesz pozwać`)
        .then(() => {
            pozwijmode[message.author.id] = true;
            pozwijmodev[message.author.id] = 1;
        })
}