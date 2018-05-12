module.exports = (message, Discord, pozwij, sell, Prodkt) => {
    const n = require('./loader');
    n.sad(message, Discord, pozwij.mode, pozwij.modev);
    n.sprzedaj(message, Discord, Prodkt, sell.nazwa, sell.mode, sell.modev, sell.cena, sell.zaw);
}