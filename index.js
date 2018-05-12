const klasa = require('./src/main/class');

let Nougat = new klasa(require('./settings.json'));
Nougat.init();
Nougat.start();