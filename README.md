![Nougat szeroki](https://i.imgur.com/tFdycx5.jpg)

# Nougat ![GitHub last commit](https://img.shields.io/github/last-commit/pizza61/nougat.svg?style=for-the-badge) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/pizza61/nougat.svg?style=for-the-badge) ![GitHub Release](https://img.shields.io/github/release/pizza61/nougat.svg?style=for-the-badge)

Nougat to bot na Discorda. Posiada ponad 30 komend z 5 różnych kategorii!! 

Funkcje przydatne administratorom serwerów (discord) takie jak: autorole, czyszczenie czatu, zakazane słowa i ARESZT (jail)

## [Invite bota](https://discordapp.com/api/oauth2/authorize?client_id=429587398511427584&permissions=469822598&scope=bot)
* [Dashboard (beta)](https://nougat.papryka.pro)

## Konfiguracja
Wymagania:
* MongoDB
* Node (zalecane 9 lub 10)
* [Klucz do API YouTube](https://developers.google.com/youtube/v3/getting-started)

### Bot
- [ ] Po sklonowaniu repo należy wpisać komendę `npm install`, która zainstaluje wszystkie potrzebne zależności.
- [ ] Następnie należy utworzyć plik `settings.json` i uzupełnić go jak w pliku [settings.json.example](https://github.com/pizza61/nougat/blob/master/settings.json.example) (sekcje dashboard zostaw na później)
- [ ] Potem zbudować przy pomocy komendy `npm run build`
### Dashboard
- [ ] Wejdź na stronę [Discord Developers](https://discordapp.com/developers/applications/)
- [ ] Wybierz aplikację dla bota
- [ ] Zobaczysz Client ID i Client Secret, skopiuj je w odpowiednie miejsca w settings.json
- [ ] Z bocznego menu wybierz **OAuth2**, pod Redirects kliknij ADD REDIRECT. Wpisz tam $ADRES_DASHBOARDA/api/discord/callback Jeżeli uruchamiasz bota lokalnie, adres dashboarda to localhost:8282
- [ ] Ten sam adres skopiuj do pola callback w settings.json
- [ ] w url wpisz adres dashboarda, lokalnie localhost:8282 (tylko dla testów lub jeżeli nie chcesz, wiem że nie chcesz)
- [ ] Kiedy wszystko zostanie poprawnie uzupełnione, można wpisać `npm start` aby uruchomić bota.

## TODO
- [ ] język angielski
- [ ] śmieszne mem obrazki
- [ ] zaawansowane levele
- [ ] Zarządzanie członkami (banowanie, wyrzucanie) // czemu po prostu nie robić tego przez discorda?