import { Message, RichEmbed } from "discord.js";
import { errorEmbed } from "../../modules/errorEmbed";
import { Nougat } from "../../main/main";

export default function cytaty(args, message: Message) {
    if(message.guild.members
        .get(message.author.id)
        .hasPermission("MANAGE_CHANNELS")) {
            // sprawdź czy oznaczył kanał
            Nougat.Serwer.findOne({id: message.guild.id},
                function(err, guild) {
                    const mbed = new RichEmbed()
                    .setAuthor("Nougat", 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                    .setTitle("Kanał z cytatami")
                    .setColor(0x73cc2d)
                    if(message.mentions.channels.first()) {
                        mbed.setDescription("Ustawiono!")
                        message.channel.send({embed: mbed})
                        guild.cytaty = message.mentions.channels.first().id;
                        guild.save();
                    } else if (args[0] == "off") {
                        guild.cytaty = null;
                        guild.save()                       
                            mbed.setDescription("Wyłączono")
                            message.channel.send({embed: mbed}) 
                        } else {
                        if(guild.cytaty === null || guild.cytaty === undefined) {
                            mbed.setDescription("Aby ustawić oznacz kanał np. *cytaty #cytaty")
                            message.channel.send({embed: mbed})                        
                        } else {
                            if(message.guild.channels.get(guild.cytaty) === null || message.guild.channels.get(guild.cytaty) === undefined) {
                                guild.cytaty = null;
                                guild.save();

                                mbed.setDescription("Aby ustawić oznacz kanał np. *cytaty #cytaty")
                                message.channel.send({embed: mbed})  
                            } else {
                                mbed.setDescription("Aktualnym kanałem z cytatami jest "+message.guild.channels.get(guild.cytaty).toString())
                                mbed.setFooter("Aby wyłączyć, użyj *cytaty off")
                                message.channel.send({embed: mbed})
                            }
                            
                        }
                    }
                })

        } else {
            // brak uprawnień
            message.channel.send({embed: errorEmbed("Nie masz uprawnień")})
        }
}