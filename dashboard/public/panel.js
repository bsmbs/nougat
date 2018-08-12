const spinner = {
    show: () => {
        document.getElementById("spinner").style.display = 'block';
    },
    hide: () => {
        document.getElementById("spinner").style.display = 'none';
    }
}

const popup = function(title, text, prompt) {
    return new Promise(function(resolve, reject) {
        let dat = document.getElementById("popp");
        dat.style.display = 'block';
        document.getElementById("all").style.opacity = '0.5';

        let titleE = document.createElement("span");
        titleE.innerText = title;
        titleE.className = 'popp-title';
        dat.appendChild(titleE);

        let textE = document.createElement("span");
        textE.innerText = text;
        textE.className = 'popp-text';
        dat.appendChild(textE);

        if(prompt) {
            let input = document.createElement("input");
            input.className = 'popp-input';
            input.type = 'text';
            dat.appendChild(input);

            let btnC = document.createElement("div");
            btnC.className = 'popp-btns';

            let btnP = document.createElement("button");
            btnP.classList.add("btn", "green");
            btnP.innerText = 'Potwierdź'

            let btna = document.createElement("button");
            btna.classList.add("btn", "red");
            btna.innerText = 'Anuluj';

            btnC.appendChild(btna);
            btnC.appendChild(btnP);

            dat.appendChild(btnC);
            btnP.onclick = function() {
                if(input.value.length < 1) reject("Puste");
                else resolve(input.value);

                dat.style.display = 'none';
                while(dat.firstChild) {
                    dat.removeChild(dat.firstChild)
                }
                document.getElementById("all").style.opacity = '1';
            }
            btna.onclick = function() {
                reject("Anulowano");
                dat.style.display = 'none';
                while(dat.firstChild) {
                    dat.removeChild(dat.firstChild)
                }
                document.getElementById("all").style.opacity = '1';
            }
        } else {
            let btnC = document.createElement("div");
            btnC.className = 'popp-btns';

            let btna = document.createElement("button");
            btna.classList.add("btn", "green");
            btna.innerText = 'OK';

            btnC.appendChild(btna);
            dat.appendChild(btnC)
            btna.onclick = function() {
                reject("Anulowano");
                dat.style.display = 'none';
                while(dat.firstChild) {
                    dat.removeChild(dat.firstChild)
                }
                document.getElementById("all").style.opacity = '1';
            }
        }



    })
}


function wybor(id, event) {
    switch(id) {
        case 0:
                document.getElementById("serwer").style.display = 'none';
                document.getElementById("serwery").style.display = 'block';
                document.getElementById("ty").style.display = 'none';
                document.getElementById("o-ty").classList.remove("active");
                event.target.classList.add("active");
            break;
        case 1:
                document.getElementById("serwer").style.display = 'none';
                document.getElementById("serwery").style.display = 'none';
                document.getElementById("ty").style.display = 'block';
                event.target.classList.add("active");
                document.getElementById("o-serwery").classList.remove("active");
    }
}

fetch("/api/discord/check", { credentials: 'include' })
    .then(resp => {
        if(resp.ok) resp.json().then(data => {
            document.getElementById("user-nick").innerText = data.data.username+'#'+data.data.discriminator;
            document.getElementById("user-av").src = `https://cdn.discordapp.com/avatars/${data.data.id}/${data.data.avatar}`;
            document.getElementById("nougat-serwery").innerText = data.guilds;
            document.getElementById("nougat-usery").innerText = data.users;
        })
        else window.location = '/'
    })


fetch("/api/discord/guilds", { credentials: 'include' })
    .then(resp => resp.json())
    .then(jresp => {
        spinner.hide();
        jresp.forEach(function(gg) {
            let trg = document.getElementById("list");
            let newel = document.createElement("div");
            newel.className = 'srv';

            let icon = document.createElement("img")
            icon.src = `https://cdn.discordapp.com/icons/${gg.id}/${gg.icon}.png`
            icon.onerror = function() {
                icon.removeAttribute("src");
                icon.style.width = '100px';
                icon.style.height = '100px';
                icon.style.background = '#222';
            }
            newel.appendChild(icon);

            let name = document.createElement("span")
            name.className = 'guildname'
            name.innerText = gg.name;
            newel.appendChild(name);

            let status = document.createElement("span");
            status.className = 'status';
            if(gg.owner) status.innerText = 'Jesteś właścicielem';
            else status.innerText = 'Członek'
            newel.appendChild(status);
            newel.addEventListener("click", () => {
                wiecej(gg);
            })
            trg.appendChild(newel);
        })
    })

function wiecej(gg) {
    document.getElementsByClassName("ctn")[0].style.opacity = '0.3';
    spinner.show();
    let ugoryinfo = document.getElementById("ogolne");
    ugoryinfo.children[0].src = `https://cdn.discordapp.com/icons/${gg.id}/${gg.icon}.png`;
    ugoryinfo.children[1].innerText = gg.name;

    fetch(`/api/discord/more?guild=` + gg.id, { credentials: 'include' })
        .then(resp => resp.json())
        .then(data => {
            ukrywaj();
            document.getElementById("serwer").style.display = 'block';

            document.getElementById("miejsce").innerText = data.odpowiedz;
            let menu = document.getElementsByClassName("wybor-ct")[0];

            let ogolne = document.getElementById("ogolne");
            let administracja = document.getElementById("administracja");

            let ogolneMenu = document.createElement("div");

            if(gg.owner) {
                document.getElementById("ranga").innerText = 'owner';
                let administracjaMenu = document.createElement("div");
                administracjaMenu.classList.add("wybor");
                administracjaMenu.innerText = 'Administracja';
                administracjaMenu.addEventListener("click", function() {
                    ogolne.style.display = 'none';
                    ogolneMenu.classList.remove("active");

                    spinner.show();
                    administracjaMenu.classList.add("active");

                    fetch('/api/discord/administracja?guild=' + gg.id, { credentials: 'include' })
                        .then(resp => resp.json())
                        .then(adminek => {
                            spinner.hide();
                            administracja.style.display = 'block';

                            /* AUTOROLE */
                            let el = document.getElementById("autorole");
                            let kolor = el.childNodes[0];
                            let name = el.childNodes[1];
                            if(adminek.autorole) {
                                el.style.borderColor = '#' + adminek.autorole.color;
                                kolor.style.background = '#' + adminek.autorole.color;

                                name.innerText = adminek.autorole.name;

                                document.getElementById("autorole-usun").style.display = 'block';
                                document.getElementById("autorole-usun").onclick = function() {
                                    fetch('/api/discord/postguild', {
                                            credentials: 'include',
                                            method: 'post',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                guild: gg.id,
                                                co: "autorole",
                                                action: "usun"
                                            })
                                        })
                                        .then(res => {
                                            if(res.ok) {
                                                el.style.borderColor = '#222';
                                                kolor.style.background = '#222';

                                                name.innerText = 'Brak';
                                                document.getElementById("autorole-usun").style.display = 'none';
                                            } else {
                                                alert("Wystąpił błąd: " + res.statusText)
                                            }
                                        })
                                }
                            } else {
                                el.style.borderColor = '#222';
                                kolor.style.background = '#222';

                                name.innerText = 'Brak';
                                document.getElementById("autorole-usun").style.display = 'none';
                            }
                            document.getElementById("autorole-zmien").onclick = function() {
                                popup("Autorole", "Wpisz tu nazwę roli, która chcesz ustawić. Wielkość liter ma znaczenie!", true)
                                    .then(nazwa => {
                                        fetch('/api/discord/postguild', {
                                                credentials: 'include',
                                                method: 'post',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    guild: gg.id,
                                                    co: "autorole",
                                                    action: "zmien",
                                                    rola: nazwa
                                                })
                                            })
                                            .then(res => {
                                                if(res.ok) {
                                                    res.json()
                                                        .then(data => {
                                                            if(data.color == "0") {
                                                                el.style.borderColor = '#222';
                                                                kolor.style.background = '#222';
                                                            } else {
                                                                el.style.borderColor = '#'+data.color;
                                                                kolor.style.background = '#'+data.color;
                                                            }
                                                            name.innerText = data.name;
                                                        
                                                            document.getElementById("autorole-usun").style.display = 'block';
                                                        })
                                                } else {
                                                    if(res.status == 410) {
                                                        popup("Błąd", "Nie znaleziono roli", false)
                                                    } else {
                                                        alert("Wystąpił nieznany błąd: " + res.statusText)
                                                    }
                                                }
                                            })
                                            .catch(() => {
                                            })
                                    })
                            }
                            /* JAILROLE */
                            let jail = document.getElementById("jailrole");
                            let koleczko = jail.childNodes[0];
                            let roleczka = jail.childNodes[1];
                            if(adminek.jailrole) {
                                jail.style.borderColor = '#'+adminek.jailrole.color;
                                koleczko.style.background = '#'+adminek.jailrole.color;
                                roleczka.innerText = adminek.jailrole.name;

                                document.getElementById("jailrole-usun").style.display = 'block';
                                document.getElementById("jailrole-usun").onclick = function() {
                                    fetch('/api/discord/postguild', {
                                        credentials: 'include',
                                        method: 'post',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            guild: gg.id,
                                            co: "jailrole",
                                            action: "usun"
                                        })
                                    })
                                    .then(res => {
                                        if(res.ok) {
                                            jail.style.borderColor = '#222';
                                            koleczko.style.background = '#222';

                                            roleczka.innerText = 'Brak';
                                            document.getElementById("jailrole-usun").style.display = 'none';
                                        } else {
                                            alert("Wystąpił błąd: " + res.statusText)
                                        }
                                    })
                                }
                            } else {
                                // jezeli nie ma adminek.jailrole
                                jail.style.borderColor = '#222';
                                koleczko.style.background = '#222';

                                roleczka.innerText = 'Brak';

                                document.getElementById("jailrole-usun").style.display = 'none';
                            }
                            document.getElementById("jailrole-zmien").onclick = function() {
                                popup("Rola Jail", "Wpisz tu nazwę roli, która chcesz ustawić. Wielkość liter ma znaczenie!", true)
                                .then(nazwa => {
                                    fetch('/api/discord/postguild', {
                                        credentials: 'include',
                                        method: 'post',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            guild: gg.id,
                                            co: "jailrole",
                                            action: "zmien",
                                            rola: nazwa
                                        })
                                    })
                                    .then(res => {
                                        if(res.ok) {
                                            res.json()
                                                .then(data => {
                                                    if(data.color == "0") {
                                                        jail.style.borderColor = '#222';
                                                        koleczko.style.background = '#222';
                                                    } else {
                                                        jail.style.borderColor = '#'+data.color;
                                                        koleczko.style.background = '#'+data.color;
                                                    }
                                                    roleczka.innerText = data.name;
                                                
                                                    document.getElementById("jailrole-usun").style.display = 'block';
                                                })
                                        } else {
                                            if(res.status == 410) {
                                                popup("Błąd", "Nie znaleziono roli", false)
                                            } else {
                                                alert("Wystąpił nieznany błąd: " + res.statusText)
                                            }
                                        }
                                    })
                                    .catch(()=> {
                                    })
                                })

                            }
                            /* END JAILROLE */
                            let welcome = document.getElementById("aktualna");
                            if(adminek.welcome) {
                                welcome.innerText = adminek.welcome;

                                document.getElementById("welcome-usun").style.display = 'block';
                                document.getElementById("welcome-usun").onclick = function() {
                                    fetch('/api/discord/postguild', {
                                        credentials: 'include',
                                        method: 'post',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            guild: gg.id,
                                            co: "welcome",
                                            action: "usun"
                                        })
                                    }).then(res => {
                                        if(res.ok) {
                                            welcome.innerText = 'Brak';
                                            document.getElementById("welcome-usun").style.display = 'none';
                                        } else {
                                            alert("Wystąpił nieznany błąd: "+res.statusText)
                                        }
                                    })
                                }
                            } else {
                                welcome.innerText = 'Brak';
                                document.getElementById("welcome-usun").style.display = 'none';
                            }
                            document.getElementById("welcome-zmien").onclick = function() {
                                popup("Wiadomośc powitalna", "Wpisz nową wiadomośc powitalną", true)
                                .then(wiadomosc => {
                                    fetch('/api/discord/postguild', {
                                        credentials: 'include',
                                        method: 'post',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            guild: gg.id,
                                            co: "welcome",
                                            action: "zmien",
                                            wiadomosc: wiadomosc
                                        })
                                    })
                                    .then(res => {
                                        if(res.ok) {
                                            res.json()
                                                .then(data => {
                                                    welcome.innerText = data.nowa;
                                                
                                                    document.getElementById("welcome-usun").style.display = 'block';
                                                })
                                        } else {
                                            alert("Wystąpił nieznany błąd: " + res.statusText)
                                        }
                                    })
                                })
                            }

                            /* ZAKAZANE */
                            let zakazanelist = document.getElementById("zakazane-lista");
                            while(zakazanelist.firstChild) {
                                zakazanelist.removeChild(zakazanelist.firstChild);
                            }
                            adminek.zakazane.forEach(klucz => {
                                let zakazann = document.createElement("div");
                                zakazann.className = 'zakazany';

                                let nazwa = document.createElement("span");
                                nazwa.innerText = klucz;
                                nazwa.className = 'zakazany-klucz'
                                zakazann.appendChild(nazwa);

                                let szpan = document.createElement("span");
                                szpan.style.flex = '1 1 100%';
                                zakazann.appendChild(szpan);

                                let usunbtn = document.createElement("button");
                                usunbtn.classList.add("btn", "red");
                                usunbtn.innerText = 'Usuń';
                                usunbtn.onclick = function() {
                                    usunZakazane(gg, klucz)
                                }
                                zakazann.appendChild(usunbtn);

                                zakazanelist.appendChild(zakazann);
                                
                            })

                            document.getElementById("zakazane-dodaj").onclick = function() {
                                popup("Dodaj nowe słowo", "Wielkość liter nie ma znaczenia", true)
                                .then(slowo => {
                                    fetch('/api/discord/postguild', {
                                        credentials: 'include',
                                        method: 'post',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            guild: gg.id,
                                            co: "zakazane",
                                            action: "dodaj",
                                            slowo: slowo
                                        })
                                    })
                                    .then(resp => {
                                        if(resp.ok) {
                                            resp.json()
                                            .then(data => {
                                                while(zakazanelist.firstChild) {
                                                    zakazanelist.removeChild(zakazanelist.firstChild);
                                                }
                                                data.nowa.forEach(klucz => {
                                                    let zakazann = document.createElement("div");
                                                    zakazann.className = 'zakazany';
                    
                                                    let nazwa = document.createElement("span");
                                                    nazwa.innerText = klucz;
                                                    nazwa.className = 'zakazany-klucz'
                                                    zakazann.appendChild(nazwa);
                    
                                                    let szpan = document.createElement("span");
                                                    szpan.style.flex = '1 1 100%';
                                                    zakazann.appendChild(szpan);
                    
                                                    let usunbtn = document.createElement("button");
                                                    usunbtn.classList.add("btn", "red");
                                                    usunbtn.innerText = 'Usuń';
                                                    usunbtn.onclick = function() {
                                                        usunZakazane(gg, klucz)
                                                    }
                                                    zakazann.appendChild(usunbtn);
                    
                                                    zakazanelist.appendChild(zakazann);
                                                    
                                                })
                                            })
                                        } else {
                                            alert("Wystąpił nieznany błąd: "+resp.statusText)
                                        }
                                    })
                                })
                            }
                        })
                })

                ogolneMenu.classList.add("wybor", "active");
                ogolneMenu.innerText = 'Ogólne';
                ogolneMenu.addEventListener("click", function() {
                    ogolne.style.display = 'block';
                    ogolneMenu.classList.add("active");

                    administracja.style.display = 'none';
                    administracjaMenu.classList.remove("active")
                })
                menu.appendChild(ogolneMenu);
                menu.appendChild(administracjaMenu);
            } else document.getElementById("ranga").innerText = 'członek';



            document.getElementById("ogolne").style.display = 'block';



            let highest;
            data.arrtop.forEach((user, index) => {
                let topek = document.createElement("div")
                topek.className = 'topek';

                let miejsce = document.createElement("span");
                miejsce.className = 'miejsce';
                miejsce.innerText = index + 1;
                topek.appendChild(miejsce);

                let av = document.createElement("img");
                av.src = user.av;
                av.height = '40';
                topek.appendChild(av);

                let topnick = document.createElement("div");
                topnick.className = 'topnick';
                topnick.innerText = `${user.nick}#${user.dsc}`;
                topek.appendChild(topnick);

                let progress = document.createElement("div");
                progress.className = 'progress';

                let meter = document.createElement("span");
                if(index == 0) {
                    highest = Number(user.punkty);
                    if(highest == 0) meter.style.width = 0;
                    else meter.style.width = '100%';
                } else {
                    if(highest == 0) meter.style.width = 0;
                    else meter.style.width = (Number(user.punkty) / highest).toLocaleString("en", { style: "percent" })
                }
                progress.appendChild(meter);
                topek.appendChild(progress);

                let punkty = document.createElement("span");
                punkty.className = 'punkty';
                punkty.innerText = user.punkty;

                topek.appendChild(punkty);

                document.getElementsByClassName("topka")[0].appendChild(topek);
            })
        })

}

function ukrywaj() {
    // czyszczenie
    document.getElementsByClassName("topka")[0].innerHTML = '';
    document.getElementsByClassName("wybor-ct")[0].innerHTML = '';

    // ukrywanie
    spinner.hide();

    document.getElementsByClassName("ctn")[0].style.opacity = '1';
    document.getElementById("serwery").style.display = 'none';
    document.getElementById("ty").style.display = 'none';
    document.getElementById("serwer").style.display = 'none';
    document.getElementById("ogolne").style.display = 'none';
    document.getElementById("administracja").style.display = 'none';
}

function usunZakazane(gg, klucz) {
    fetch('/api/discord/postguild', {
        credentials: 'include',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            guild: gg.id,
            co: "zakazane",
            action: "usun",
            slowo: klucz
        })
    })
    .then(resp => {
        if(resp.ok) {
            resp.json()
            .then(data => {
                let zakazanelist = document.getElementById("zakazane-lista")
                while(zakazanelist.firstChild) {
                    zakazanelist.removeChild(zakazanelist.firstChild);
                }
                data.nowa.forEach(klucz => {
                    let zakazann = document.createElement("div");
                    zakazann.className = 'zakazany';

                    let nazwa = document.createElement("span");
                    nazwa.innerText = klucz;
                    nazwa.className = 'zakazany-klucz'
                    zakazann.appendChild(nazwa);

                    let szpan = document.createElement("span");
                    szpan.style.flex = '1 1 100%';
                    zakazann.appendChild(szpan);

                    let usunbtn = document.createElement("button");
                    usunbtn.classList.add("btn", "red");
                    usunbtn.innerText = 'Usuń';
                    usunbtn.onclick = function() {
                        usunZakazane(gg, klucz)
                    }
                    zakazann.appendChild(usunbtn);

                    zakazanelist.appendChild(zakazann);
                    
                })
            })
        } else {
            alert("wystąpił nieznany błąd: "+resp.statusText)
        }
    })
}