export default function odwroc(args, message) {
    // komenda odwracajaca slowo
    let reverse = args.slice(0).join(" ").replace("@", "alleap");
    let emoi = "\🙃"
    message.channel.send(`${emoi} ${reverse.split("").reverse().join("")}`);
}