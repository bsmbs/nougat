import { GuildMember, Guild, Client } from "discord.js";
import { autoroleService } from './autoroleService';
import { welcomeService } from './welcomeService';
let config = require('../../../settings.json')


export function onMemberJoin(member: GuildMember) {
    autoroleService(member);
    welcomeService(member);
}

export function onBotJoin(client: Client, guild: Guild) {
    const arrow = '➡️';
    const wazne = '⚠️';
    const msg = 
`Jestem **Nougat**, w 100% **polski** i **otwartoźródłowy** bot.
${arrow} Dziękujemy za wybranie Nougata, mamy nadzieję że będzie się miło korzystało
${arrow} Lista komend dostępna jest pod komendą \`${config.prefix}help\`
${arrow} Kod na GitHubie: https://github.com/pizza61/nougat
${arrow} Support serwer: ${config.support}
${arrow} **Dashboard** z listą najaktywniejszych użytkowników, a także wieloma narzędzami dla właścicieli: ${config.dashboard.url}
${arrow} Jeżeli ty lub członkowie serwera chcą używać Nougata u siebie, tutaj jest **invite**: ${config.dashboard.url}/invite
${arrow} Ten serwer jest już **${client.guilds.size}**!
${wazne} Aby Nougat zapisał sobie ten serwer na dobre, należy wysłać dwie wiadomości.
`
    if(guild.defaultChannel) {
        guild.defaultChannel.send(msg);
    } else {
        guild.owner.send(msg);
    }
}