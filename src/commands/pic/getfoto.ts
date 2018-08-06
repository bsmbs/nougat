import { Message } from "discord.js";

export function getfoto(message: Message, args) {
    return new Promise((resolve, reject) => {
        if(message.attachments.first()) {
            resolve(message.attachments.first().url)
        } else {
            if(message.mentions.members.first()) {
                resolve(message.mentions.members.first().user.avatarURL)
            } else if (args.slice(0).join(" ") != '') resolve(args.slice(0).join(" "))
            else reject("Brak zdjęcia")
        }
    })
} 