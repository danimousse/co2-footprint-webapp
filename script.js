// Lade die Datei "emissionen.json" asynchron (ohne die Seite zu blockieren)
fetch("emissionen.json")
  // Wenn die Datei erfolgreich geladen wurde, wandle den Text in ein JavaScript-Objekt um
  .then(function (response) {
    return response.json();
  })
  // Wenn die Umwandlung erfolgreich war, arbeite mit den Daten weiter
  .then(function (daten) {
    // Suche das <tbody>-Element innerhalb der Tabelle mit der ID "emissions-tabelle"
    const tabelle = document.querySelector("#emissions-tabelle tbody");

    // Durchlaufe jeden Eintrag im JSON-Array (z. B. jedes Unternehmen mit Emissionsdaten)
    daten.forEach(function (eintrag) {
      // Erstelle eine neue Tabellenzeile <tr>
      const zeile = document.createElement("tr");

      // Erstelle eine neue Zelle <td> für das Land und füge sie zur Zeile hinzu
      const zelleLand = document.createElement("td");
      zelleLand.textContent = eintrag.land;
      zeile.appendChild(zelleLand);

      // Erstelle eine neue Zelle für das Unternehmen
      const zelleUnternehmen = document.createElement("td");
      zelleUnternehmen.textContent = eintrag.unternehmen;
      zeile.appendChild(zelleUnternehmen);

      // Erstelle eine neue Zelle für die Branche
      const zelleBranche = document.createElement("td");
      zelleBranche.textContent = eintrag.branche;
      zeile.appendChild(zelleBranche);

      // Erstelle eine neue Zelle für die Emissionen (formatiert mit Punkt für Tausender)
      const zelleEmissionen = document.createElement("td");
      zelleEmissionen.textContent = eintrag.emissionen.toLocaleString();
      zeile.appendChild(zelleEmissionen);

      // Erstelle eine neue Zelle für das Jahr
      const zelleJahr = document.createElement("td");
      zelleJahr.textContent = eintrag.jahr;
      zeile.appendChild(zelleJahr);

      // Hänge die fertige Zeile mit allen Zellen in die Tabelle ein
      tabelle.appendChild(zeile);
    });
  })
  // Wenn ein Fehler auftritt (z. B. Datei nicht gefunden), zeige ihn in der Konsole an
  .catch(function (error) {
    console.error("Fehler beim Laden der JSON-Datei:", error);
  });

function tabelleFiltern() {
  const eingabe = document.getElementById("suchfeld");
  const filter = eingabe.value.toUpperCase();
  const tabelle = document.getElementById("emissions-tabelle");
  const zeilen = tabelle.getElementsByTagName("tr");
  // Die Eingabe wird ausschließlich zum Vergleich von Text verwendet.
  // Es erfolgt keine HTML-Ausgabe oder DOM-Manipulation mit der Eingabe selbst, damit besteht kein Risiko für XSS-Angriffe.

  for (let i = 1; i < zeilen.length; i++) {
    const zellen = zeilen[i].getElementsByTagName("td");
    let zeileAnzeigen = false;

    for (let j = 0; j < zellen.length; j++) {
      const zelle = zellen[j];
      if (zelle) {
        const text = zelle.textContent || zelle.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
          zeileAnzeigen = true;
          break;
        }
      }
    }

    zeilen[i].style.display = zeileAnzeigen ? "" : "none";
  }
}

const sortierRichtung = {}; // globale Variable zur Speicherung der Sortierrichtung

function sortiereTabelle(spaltenIndex) {
  const table = document.getElementById("emissions-tabelle");
  let richtung = sortierRichtung[spaltenIndex] || "asc";
  let switching = true;

  while (switching) {
    switching = false;
    const rows = table.rows;

    for (let i = 1; i < rows.length - 1; i++) {
      const x = rows[i].getElementsByTagName("TD")[spaltenIndex];
      const y = rows[i + 1].getElementsByTagName("TD")[spaltenIndex];

      const xContent = x.textContent.trim();
      const yContent = y.textContent.trim();

      const istZahl = !isNaN(xContent.replace(/\./g, "").replace(",", "."));
      const a = istZahl
        ? parseFloat(xContent.replace(/\./g, "").replace(",", "."))
        : xContent.toLowerCase();
      const b = istZahl
        ? parseFloat(yContent.replace(/\./g, "").replace(",", "."))
        : yContent.toLowerCase();

      const tauschen =
        (richtung === "asc" && a > b) || (richtung === "desc" && a < b);

      if (tauschen) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        break;
      }
    }
  }

  // Richtung fürs nächste Mal umdrehen
  sortierRichtung[spaltenIndex] = richtung === "asc" ? "desc" : "asc";
}



document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.getElementById("burger-toggle");
  const navigation = document.querySelector(".navigation");

  if (burgerButton && navigation) {
    burgerButton.addEventListener("click", function () {
      navigation.classList.toggle("show");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const sprache = navigator.language || navigator.userLanguage;
  const naviContainer = document.querySelector(".nav-container");
  const navigation = document.querySelector(".navigation");

  if (
    sprache.startsWith("ar") ||
    sprache.startsWith("he") ||
    sprache.startsWith("fa") ||
    sprache.startsWith("ur") ||
    sprache.startsWith("dv") ||
    sprache.startsWith("ku") ||
    sprache.startsWith("yi") ||
    sprache.startsWith("ps") ||
    sprache.startsWith("syr")
  ) {
    naviContainer.classList.add("rtl");
    navigation.classList.add("rtl");
  } else {
    naviContainer.classList.add("ltr");
    navigation.classList.add("ltr");
  }
});
