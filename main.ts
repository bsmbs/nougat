import { Nougat } from './src/main/main';
let m;
try {
    m = require('../settings.json');
} catch(e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    } else {
        throw new Error("GDZIE SIĘ PAN TAK ŚPIESZY a settings.json zrobił?")
    }
}
let Ng = new Nougat(m);
Ng.init();
Ng.start();