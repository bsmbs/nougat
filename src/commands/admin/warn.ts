import { Nougat } from "../../main/main";
import { RichEmbed, Message } from "discord.js";
import { errorEmbed, usageEmbed } from "../../modules/errorEmbed";

export default function warn(args, message: Message) {
  let powod = args.slice(1).join(" ");
  let ofiara = message.mentions.members.first();
  if (typeof ofiara == "undefined") {
    message.channel.send({embed: usageEmbed("warn @kogo powod")});
  } else {
    if (
      message.guild.members.get(message.author.id).hasPermission("KICK_MEMBERS")
    ) {
      // dodaj warny użytkownikowi
      Nougat.Uzytnik.findOne(
        { uid: message.mentions.members.first().id },
        function(err, user) {
          let guild = user.serwery.find(guild => guild.id == message.guild.id);
          if (guild) {
              if(typeof(guild.warny) == 'undefined') guild.warny = 0;
              guild.warny++;
              user.save();
              // zakomunikuj
              const warnSEmbed = new RichEmbed()
                  .setAuthor(
                      "Nougat",
                      "https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024"
                  )
                  .setTitle("Ostrzeżono użytkownika pomyślnie!")
                  .setDescription("To był "+guild.warny+" warn")
                  .setColor(0x198c41);
              message.channel.send({
                  embed: warnSEmbed
              });

              const warnAEmbed = new RichEmbed()
                  .setAuthor(
                      "Nougat",
                      "https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024"
                  )
                  .setTitle("Zostałeś ostrzeżony na serwerze " + message.guild.name)
                  .addField("Powód", powod)
                  .addField("Ilość warnów", guild.warny)
                  .setColor(0x198c41);
              message.mentions.members.first().send({
                  embed: warnAEmbed
              });
          }
          }
      );
    } else {
      message.channel.send({embed: errorEmbed("Nie masz uprawnień")});
    }
  }
}
