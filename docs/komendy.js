let komendy = [
    {
        nazwa: "Administracja",
            komendy: [{
                cmd: "autorole",
                args: "<nazwa roli|usun>",
                opis: "Ustawia rolę automatyczną lub wyłącza"
            },{
                cmd: "czysc",
                args: "<liczba wiadomości>",
                opis: "Usuwa z kanału wskazaną liczbe wiadomości"
            },{
                cmd: "jail",
                args: "<nazwa roli|mention>",
                opis: "Wrzuca oznaczonego użytkownika do aresztu lub ustawia rolę, która ma być ustawiona" 
            },{
                cmd: "nazwa",
                args: "<nazwa>",
                opis: "Zmiania pseudonim bota na serwerze"
            },{
                cmd: "warn",
                args: "<wzmianka> [powod]",
                opis: "Daje ostrzeżenie oznaczonemu użytkownikowi z [powodem]"
            }, {
                cmd: "zakazane",
                args: "[dodaj|usun|lista]",
                opis: "Zarządza zakazanymi wyrazami"
            }
    ]},
    {
        nazwa: "Ekonomia",
        komendy: [{
            cmd: "biedronka",
            args: "brak",
            opis: "Wyświetla dostępne produkty"
        },{
            cmd: "hajs",
            args: "brak",
            opis: "Wyświetla stan konta"
        },{
            cmd: "kup",
            args: "<id produktu>",
            opis: "Kupuje wskazany produkt"
        },{
            cmd: "sprzedaj",
            args: "brak",
            opis: "[INTERAKTYWNE] Przeprowadza przez sprzedawanie produktu"
        },{
            cmd: "zaplac",
            args: "<wzmianka> <pieniadze>",
            opis: "Wysyla oznaczonemu uzytkownikowi dana ilość pieniędzy"
        }]
    },
    {
        nazwa: "Informacyjne",
        komendy: [{
            cmd: "check",
            args: "brak",
            opis: "Sprawdza uprawnienia bota"
        },{
            cmd: "checkme",
            args: "brak",
            opis: "Sprawdza twoje uprawnienia"
        },{
            cmd: "git",
            args: "brak",
            opis: "Informacja o bocie"
        },{
            cmd: "help",
            args: "brak",
            opis: "Lista komend na Discordzie"
        },{
            cmd: "staty",
            args: "brak",
            opis: "Statystki serwera"
        },{
            cmd: "userinfo",
            args: "[wzmianka]",
            opis: "Wyświetla informacje o tobie lub oznaczonym użytkowniku"
        },{
            cmd: "yt",
            args: "<nazwa kanalu>",
            opis: "Wyświetla informacje o kanale yt"
        }]
    },
    {
        nazwa: "Obrazki",
        komendy: [{
            cmd: "jasny",
            args: "zalacz obrazek lub link",
            opis: "Rozjaśnia obrazek"
        },{
            cmd: "kolory",
            args: "zalacz obrazek lub link",
            opis: "Odwraca kolory obrazka"
        },{
            cmd: "przekrec",
            args: "zalacz obrazek lub link",
            opis: "Przekreca kolory obrazka"
        },{
            cmd: "sepia",
            args: "zalacz obrazek lub link",
            opis: "Sepia"
        }]
    },
    {
        nazwa: "Zabawa",
        komendy: [{
            cmd: "8pilka",
            args: "<zapytanie>",
            opis: "8piłka czyli 8ball, odpowiada na zadane pytanie"
        },{
            cmd: "ciastko",
            args: "brak",
            opis: "Wysyła ciastko"
        },{
            cmd: "mono",
            args: "brak",
            opis: "Wysyła mono"
        },{
            cmd: "odwroc",
            args: "<zdanie>",
            opis: "Odwraca zdanie"
        },{
            cmd: "pozwij",
            args: "brak",
            opis: "[INTERAKTYWNE] Pozywa kogoś"
        },{
            cmd: "sms",
            args: "<wzmianka> <tresc>",
            opis: "Wysyła prywatną wiadomość do kogoś"
        },{
            cmd: "statek",
            args: "<wzmianka> <wzmianka>",
            opis: "shipuje"
        },{
            cmd: "wybierz",
            args: "wybory oddzielone |",
            opis: "Wybiera coś"
        }]
    }
]

komendy.forEach((kategoria) => {
    let kat = new box(kategoria.nazwa);
    kategoria.komendy.forEach((komenda) => {
        kat.dodajKomende(komenda.cmd, komenda.args, komenda.opis);
    })
    kat.zatwierdz();
})