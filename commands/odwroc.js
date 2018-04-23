exports.run = (args, message) => {
    // komenda odwracajaca slowo
    let reverse = args.slice(0).join(" ");
    let emoi = "\🙃"
    message.channel.send(`${emoi} ${reverse.split("").reverse().join("")}`);
}