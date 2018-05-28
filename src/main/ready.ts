/*eslint no-console: "off"*/

export function ready(client) {
    console.log(`Nougat zalogowany jako ${client.user.tag}`);
    client.user.setActivity('na '+client.guilds.size+' serwerach!', {
        type: 'LISTENING'
    });
}