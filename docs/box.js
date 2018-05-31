function stw(nazwa) { // Szybkie Tworzenie Wpisu
    let cs = document.createElement("td");
    cs.innerText = nazwa;
    return cs;
}

class box {
    constructor(tytul) {
        this.element = document.createElement("table");
        
        this.boxDiv = document.createElement("div")
        this.boxDiv.className = 'box';
        

        let tytulElement = document.createElement("h3");
        tytulElement.className = 'box-titl';
        tytulElement.innerText = tytul;
        this.boxDiv.appendChild(tytulElement);
        this.boxDiv.appendChild(this.element);

        let gora = document.createElement("tr");
        gora.className = 'gora';
        this.element.appendChild(gora);
        gora.appendChild(stw("Komenda"))
        gora.appendChild(stw("Argumenty"))
        gora.appendChild(stw("Opis"))        
    }

    dodajKomende(komenda, argumenty, opis) {
        let trek = document.createElement("tr");
        trek.appendChild(stw(komenda))
        trek.appendChild(stw(argumenty))
        trek.appendChild(stw(opis))

        this.element.appendChild(trek);
    }

    zatwierdz() {
        document.getElementsByClassName('bramki')[0].appendChild(this.boxDiv);
    }
}