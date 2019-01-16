import { RichEmbed } from "discord.js";

export function errorEmbed(message: String) {
    let embed = new RichEmbed()
    .setAuthor(
        "Nougat",
        "https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024"
    )
    .setTitle("Wystąpił błąd")
    .setDescription(message)
    .setColor(0xC62828);

    return embed;
}

export function usageEmbed(message: String) {
    let embed = new RichEmbed()
    .setAuthor(
        "Nougat",
        "https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024"
    )
    .setTitle("Poprawne użycie")
    .setDescription(message)
    .setColor(0xC62828);

    return embed;
}