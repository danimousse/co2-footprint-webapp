// Lade die Datei "emissionen.json" asynchron (ohne die Seite zu blockieren)
fetch("emissionen.json")
  // Wenn die Datei erfolgreich geladen wurde, wandle den Text in ein JavaScript-Objekt um
  .then(function(response) {
    return response.json();
  })
  // Wenn die Umwandlung erfolgreich war, arbeite mit den Daten weiter
  .then(function(daten) {
    // Suche das <tbody>-Element innerhalb der Tabelle mit der ID "emissions-tabelle"
    const tabelle = document.querySelector("#emissions-tabelle tbody");

    // Durchlaufe jeden Eintrag im JSON-Array (z. B. jedes Unternehmen mit Emissionsdaten)
    daten.forEach(function(eintrag) {

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
  .catch(function(error) {
    console.error("Fehler beim Laden der JSON-Datei:", error);
  });

  //Filterung der Tabelle basierend auf Benutzereingaben
function tabelleFiltern() {
  const input = document.getElementById("suchfeld");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("emissions-tabelle");
  const tr = table.getElementsByTagName("tr");

  // Durchsuche alle Zeilen
  for (let i = 1; i < tr.length; i++) { // Start bei 1 = überspringe <thead>
    const tds = tr[i].getElementsByTagName("td");
    let sichtbar = false;

    // Durchsuche alle Zellen der Zeile
    for (let j = 0; j < tds.length; j++) {
      const td = tds[j];
      if (td && td.textContent.toUpperCase().indexOf(filter) > -1) {
        sichtbar = true;
      }
    }

    tr[i].style.display = sichtbar ? "" : "none";
  }
}
function sortiereTabelle(spaltenIndex) {
  const table = document.getElementById("emissions-tabelle");
  let switching = true;
  let richtung = "asc";

  while (switching) {
    switching = false;
    const rows = table.rows;

    for (let i = 1; i < rows.length - 1; i++) {
      const x = rows[i].getElementsByTagName("TD")[spaltenIndex];
      const y = rows[i + 1].getElementsByTagName("TD")[spaltenIndex];

      const xContent = x.textContent.trim();
      const yContent = y.textContent.trim();

      const istZahl = !isNaN(xContent.replace(/\./g, '').replace(',', '.'));
      const a = istZahl ? parseFloat(xContent.replace(/\./g, '').replace(',', '.')) : xContent.toLowerCase();
      const b = istZahl ? parseFloat(yContent.replace(/\./g, '').replace(',', '.')) : yContent.toLowerCase();

      if ((richtung === "asc" && a > b) || (richtung === "desc" && a < b)) {
        // ✅ i ist hier gültig, weil du IN der Schleife bist
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        break;
      }
    }

    if (!switching && richtung === "asc") {
      richtung = "desc";
      switching = true;
    }
  }
}


