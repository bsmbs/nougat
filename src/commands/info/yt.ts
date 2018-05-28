import { RichEmbed } from 'discord.js';
let config = require('../../../../settings.json')
import * as rp from 'request-promise';

export default function yt(args, message) {
    let jquery = args.slice(0).join(" ");
    if(!(jquery == '')) {
        let options = {
            uri: 'https://www.googleapis.com/youtube/v3/search',
            qs: {
                key: config.ytapi,
                part: 'snippet,id',
                type: 'channel',
                order: 'viewCount',
                q: jquery
            },
            json: true
        }
        rp(options)
            .then(function(wyniki) {
                if(wyniki.pageInfo.totalResults == 0) {
                    message.channel.send('Nie znaleziono nic dla ' + jquery);
                    return;
                }
                let siemason = {
                    uri: 'https://www.googleapis.com/youtube/v3/channels',
                    qs: {
                        key: config.ytapi,
                        part: 'snippet,contentDetails,statistics',
                        fields: 'items(id,snippet(title,description,customUrl,publishedAt,thumbnails(default(url)),country),statistics,contentDetails)',
                        id: wyniki.items[0].id.channelId
                    },
                    json: true
                }
                rp(siemason)
                    .then(function(kanalik) {
                        const blowRak = new RichEmbed()
                            .setAuthor('Nougat - youtube info', 'https://cdn.discordapp.com/avatars/429587398511427584/d829eb3c8594727981b8c80699285479.png?size=128', 'https://papryka.pro/yt')
                            .setColor((Math.random() * 0xFFFFFF << 0).toString(16))
                            .setThumbnail(kanalik.items[0].snippet.thumbnails.default.url)
                            .setTitle(kanalik.items[0].snippet.title)
                            .setURL("https://youtube.com/channel/" + kanalik.items[0].id)
                            .setDescription(kanalik.items[0].snippet.description)
                            .addField('Subskrybcji', Number(kanalik.items[0].statistics.subscriberCount).toLocaleString(), true)
                            .addField('Liczba filmów', Number(kanalik.items[0].statistics.videoCount), true)
                            .addField('Liczba wyświetleń', Number(kanalik.items[0].statistics.viewCount).toLocaleString(), true)
                            .setFooter('Zapraszamy także na https://papryka.pro/yt', 'https://papryka.pro/icon.png')
                        message.channel.send({
                            embed: blowRak
                        });
                    })
            })
    }
}