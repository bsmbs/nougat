import { GuildMember, Guild, Client } from "discord.js";
import { autoroleService } from './autoroleService';
import { welcomeService } from './welcomeService';
let config = require('../../../settings.json')


export function onMemberJoin(member: GuildMember) {
    autoroleService(member);
    welcomeService(member);
}