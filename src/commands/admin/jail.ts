import { Message, RichEmbed, Role, GuildMember, Client } from "discord.js";
import { Nougat } from '../../main/main';
import { isNull, isNullOrUndefined } from "util";

function get(id, array): number {
    var kolczyk;
    array.forEach((klucz, index) => {
        if(klucz.id == id) kolczyk = index;
    })

    if(kolczyk) return kolczyk;
    else return null;
}
// funkcja sprawdzająca 1(symulowane dodawanie do jaila)
function symWrzuc(client: Client, mention: GuildMember, jailRola): boolean {
    let c = mention.guild.roles.get(jailRola).position;
    let bt = mention.guild.members.get(client.user.id).highestRole.position;
    let mn = mention.highestRole.position;

    var powodzenie;

    if(mn < bt) {
        powodzenie = true;
    } else powodzenie = false;

    if(c > bt) { powodzenie = false; }

    if(powodzenie) return true;
    else return false;
}
// funkcja ogólna
export default function jail(client: Client, args, message: Message) {
    let ranga = args.slice(0).join(" ");
    let mention = message.mentions.members.first()
    if(mention) {
        // funkcja wsadzajaca do jaila
        var roleArray = []
        mention.roles.forEach((rola) => {
            if(!rola.name.includes("everyone")) roleArray.push(rola.id);
        })
        Nougat.Serwer.find({id: message.guild.id}, (err, memb) => {
            if(err) return;
            if(isNullOrUndefined(memb[0].jailRola)) {
                message.channel.send("Nie ma roli jailowej! Ustaw ją używając *jail <nazwa roli>");
                return;
            }
            let ss = get(mention.id, memb[0].jail);
            if(!isNull(ss) && ss >= 0) { // WYJMOWANIE
                let uniewinniony = memb[0].jail[ss];
                uniewinniony.roles.forEach((rola) => {
                    mention.addRole(rola).catch((e) => {
                        message.channel.send("Wystąpił błąd, nie mogę nadać roli: "+message.guild.roles.get(rola).name+", sprawdź moje uprawnienia i przyznaj ją samodzielnie.");
                    })
                })
                mention.removeRole(memb[0].jailRola)
                memb[0].jail.splice(ss, 1);
                memb[0].save();
                message.channel.send({embed: new RichEmbed()
                    .setAuthor('Nougat - Jail', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle("jail: Komenda przeznaczona dla administatora (serwera)")
                    .setDescription("Wyjęto użytkownika "+mention.displayName+" z aresztu. Mamy nadzieję, że czegoś się nauczył.")})
            } else { // dodaje do arraya - WRZUCANIE
                if(!symWrzuc(client, mention, memb[0].jailRola)) {
                    message.channel.send("Niestety, bot jest niżej od osoby którą chcesz wrzucić lub roli jailowej, więc sprawdź to i spróbuj jeszcze raz.");
                    return;
                }
                memb[0].jail.push({id: mention.id, roles: roleArray});
                
                mention.roles.forEach(rola => {
                    if(!rola.name.includes("everyone")) mention.removeRole(rola).catch((e) => {
                        message.channel.send("Nie można usunąć roli "+rola.name);
                    });
                })
                mention.addRole(memb[0].jailRola)
                    .then(() => memb[0].save())
                    .catch((e) => { message.channel.send("Nie mogę dodać roli jaila") })

                message.channel.send({embed: new RichEmbed()
                    .setAuthor('Nougat - Jail', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle("jail: Komenda przeznaczona dla administatora (serwera)")
                    .setDescription("Wrzucono użytkownika "+mention.displayName+" do aresztu.")})
            }
        })
    } else {
        if(ranga.length > 1) {
            let pa = message.guild.roles.find('name', ranga);
            if(pa) {
                Nougat.Serwer.find({id: message.guild.id}, (err, gis) => {
                    if(err) return;
                    gis[0].jailRola = pa.id;
                    gis[0].save();
                    message.channel.send({embed: new RichEmbed()
                        .setAuthor('Nougat - Jail', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                        .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                        .setTitle("jail: Komenda przeznaczona dla administatora")
                        .setDescription("Ustawiono rolę")    
                    })
                })
            } else {
                message.channel.send({embed: new RichEmbed()
                    .setAuthor('Nougat - Jail', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                    .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                    .setTitle("jail: Komenda przeznaczona dla administatora")
                    .setDescription("Nie znaleziono takiej roli.")    
                })
            }
        } else {
            message.channel.send({embed: new RichEmbed()
                .setAuthor('Nougat - Jail', 'https://cdn.discordapp.com/avatars/429587398511427584/a8d77ae510e68cc595c1ccda04a755fa.jpg?size=1024')
                .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                .setTitle("jail: Komenda przeznaczona dla administatora")
                .setDescription("Usuwa użytkownikowi wszystkie role i nadaje jedną, która może uniemożliwiać mu pisanie lub czytanie, to zależy już od roli\nOznacz użytkownika, aby go ukarać, lub wpisz nazwę roli, aby ustawić rolę która ma być przyznawana.")    
            })
        }
    }
}