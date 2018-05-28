// import { Nougat } from './main';
import * as n from './loader';

export function check(message, pozwij, sell) {
    n.sad(message, pozwij.mode, pozwij.modev);
    n.sprzedaj(message, sell.nazwa, sell.mode, sell.modev, sell.cena, sell.zaw);
}