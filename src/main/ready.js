/*eslint no-console: "off"*/

exports.run = (client) => {
    console.log(`Nougat zalogowany jako ${client.user.tag}`);
    client.user.setActivity('na '+client.guilds.size+' serwerach!', {
        type: 'LISTENING'
    });
}