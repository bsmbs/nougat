exports.run = (message, client) => {
    let cookie = "\🍪";
    message.channel.send(`${client.users.find('username', message.author.username).toString()}, masz tu: ${cookie}`)
}