import { GuildMember } from "discord.js";
import { autoroleService } from './autoroleService';
import { welcomeService } from './welcomeService';

export function onJoin(member: GuildMember) {
    autoroleService(member);
    welcomeService(member);
}