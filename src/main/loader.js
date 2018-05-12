// modules
const sad = require('../modules/sadownictwo');
exports.sad = sad.run;

const sprzedaj = require('../modules/sprzedaj');
exports.sprzedaj = sprzedaj.run;

// commands: admin

const nazwa = require('../commands/admin/nazwa');
exports.nazwa = nazwa.run;

const warn = require('../commands/admin/warn');
exports.warn = warn.run;

// commands: economy

const biedronka = require('../commands/eco/biedronka');
exports.biedronka = biedronka.run;

const hajs = require('../commands/eco/hajs');
exports.hajs = hajs.run;

const kup = require('../commands/eco/kup');
exports.kup = kup.run;

const sprzedajm = require('../commands/eco/sprzedaj');
exports.sprzedajm = sprzedajm.run;

const zaplac = require('../commands/eco/zaplac');
exports.zaplac = zaplac.run;

// commands: info

const git = require('../commands/info/git');
exports.git = git.run;

const help = require('../commands/info/help');
exports.help = help.run;

const staty = require('../commands/info/staty');
exports.staty = staty.run;

const userinfo = require('../commands/info/userinfo');
exports.userinfo = userinfo.run;

const yt = require('../commands/info/yt');
exports.yt = yt.run;

// commands: pic

const jasny = require('../commands/pic/jasny');
exports.jasny = jasny.run;

const odwrocKolory = require('../commands/pic/odwrocKolory');
exports.odwrocKolory = odwrocKolory.run;

const przekrec = require('../commands/pic/przekrec');
exports.przekrec = przekrec.run;

const sepia = require('../commands/pic/sepia');
exports.sepia = sepia.run;

// commands: other

const ciastko = require('../commands/other/ciastko');
exports.ciastko = ciastko.run;

const mono = require('../commands/other/mono');
exports.mono = mono.run;

const odwroc = require('../commands/other/odwroc');
exports.odwroc = odwroc.run;

const pozwij = require('../commands/other/pozwij');
exports.pozwij = pozwij.run;

const pilka = require('../commands/other/8pilka');
exports.pilka = pilka.run;

const sms = require('../commands/other/sms');
exports.sms = sms.run;

const statek = require('../commands/other/statek');
exports.statek = statek.run;
/*



































*/