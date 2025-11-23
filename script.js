/* Variablen */

let searchButton = document.querySelector("#search");
let inputVon = document.querySelector("#from");
let inputZiel = document.querySelector("#to");
let fluege = [];
let fluegeListe = document.querySelector("#flugDaten");

/* Inhalte aus json holen */
fetch("fluege.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Netzwerkantwort war nicht ok");
    }
    return response.json();
  })
  .then((daten) => {
    fluege = daten;
  })
  .catch((error) => {
    console.error("Fehler beim Abrufen der JSON-Daten:", error);
  });

/* Event Listener */
searchButton.addEventListener("click", inputFluege);
inputVon.addEventListener("input", inputFluege);
inputZiel.addEventListener("input", inputFluege);

/* Funktion Ergebnisse mit passenden Flügen zeigen*/
function inputFluege() {
  let vonValue = inputVon.value.trim();
  let zuValue = inputZiel.value.trim();
  fluegeListe.innerHTML = "";
  let passendeFluege = false;

  for (let flugNr = 0; flugNr < fluege.length; flugNr++) {
    let flugStart = fluege[flugNr].start;
    let flugEnde = fluege[flugNr].ziel;

    let flugStartKlein = flugStart.toLowerCase();
    let flugEndeKlein = flugEnde.toLowerCase();

    if (
      /* Flüge bei denen Start und Ziel zusammen passen filtern */
      flugStartKlein.includes(vonValue.toLowerCase()) &&
      flugEndeKlein.includes(zuValue.toLowerCase())
    ) {
      /* Ergebnis mit Flugdaten im html ausgeben */
      fluegeListe.innerHTML += generateHtml(flugNr);
      passendeFluege = true;
    } 
  }
  if ((passendeFluege == false)) {
    fluegeListe.innerHTML = `<p class="fehler">Es wurden keine passenden Flüge gefunden.</p>`;
  }
}

function generateHtml(flugNr) {
  return `<article id="flug">
            <div id="dauer">
              <div id="timeline">
                <div id="start">
                  <p id="startZeit" class="zeit">${fluege[flugNr].startzeit}</p>
                  <p id="abkS" class="abk">${fluege[flugNr].start}</p>
                </div>
                <div id="stop"><p>${fluege[flugNr].stops + " Stopp"}</p></div>
                <div id="ziel">
                  <p id="ankunftsZeit" class="zeit">${
                    fluege[flugNr].ankunftszeit
                  }</p>
                  <p id="abkZ" class="abk">${fluege[flugNr].ziel}</p>
                  <p class="terminal" id="terminal">${
                    fluege[flugNr].terminal
                  }</p>
                </div>
              </div>
              
              <div class="info-time"><figure><img src="./resources/clock-svgrepo-com.svg" width="20px" height="20px" /></figure><p id="zeit">Dauer: ${fluege[flugNr].flugdauer}</p></div>
            </div>

            <div id="economy" class="preise">
              <p class="preistitel">Economy</p>
              <p>ab</p>
              <p id="preisE" class="wert">${fluege[flugNr].preis.economy}</p>
              <figure><img class="arrow" src="./resources/chevron-down-svgrepo-com.svg" width="24px" height="24px"></figure>
            </div>
            <div id="business" class="preise">
              <p class="preistitel">Business</p>
              <p>ab</p>
              <p id="preisB" class="wert">${fluege[flugNr].preis.business}</p>
              <figure><img class="arrow" src="./resources/chevron-down-svgrepo-com.svg" width="24px" height="24px"></figure>
            </div>
          </article>`;
}
