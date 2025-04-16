setInterval(() => {
    ladeBegriffe(); 
  }, 5 * 60 * 1000); // alle 5 minuten laden  


let begriffe = [];

    async function ladeBegriffe() {
      try {
        const res = await fetch("begriffe2.json");
        begriffe = await res.json();
        ladeNeuenBegriff();
        aktualisiereBegriffListe();
      } catch (err) {
        console.error("Fehler beim Laden der Begriffe:", err);
      }
    }

    function ladeNeuenBegriff() {
      const gefiltert = getGefilterteBegriffe();
      if (gefiltert.length === 0) return;
      const zufall = Math.floor(Math.random() * gefiltert.length);
      zeigeBegriff(gefiltert[zufall]);
    }

    function zeigeBegriff(eintrag) {
      document.getElementById("begriff-titel").textContent = eintrag.titel;
      document.getElementById("begriff-beschreibung").textContent = eintrag.beschreibung;
      document.getElementById("begriff-beispiel").textContent = eintrag.beispiel;
      document.getElementById("begriff-kategorie").textContent = eintrag.kategorie;
    }

    function getGefilterteBegriffe() {
      const suchtext = document.getElementById("suche-input").value.toLowerCase();
      const kategorie = document.getElementById("kategorie-filter").value;
      return begriffe.filter(b => {
        const passtKategorie = !kategorie || b.kategorie === kategorie;
        const passtSuche = b.titel.toLowerCase().includes(suchtext) ||
                           b.beschreibung.toLowerCase().includes(suchtext);
        return passtKategorie && passtSuche;
      });
    }

    function aktualisiereBegriffListe() {
      const container = document.getElementById("begriff-liste");
      container.innerHTML = "";
      const gefiltert = getGefilterteBegriffe();
      gefiltert.forEach(b => {
        const el = document.createElement("div");
        el.className = "bg-gray-800 rounded p-4 shadow hover:shadow-md hover:bg-gray-700 cursor-pointer";
        el.innerHTML = `<h4 class="text-lg font-semibold text-violet-400">${b.titel}</h4><p class="text-sm text-gray-300">${b.beschreibung}</p>`;
        el.onclick = () => zeigeBegriff(b);
        container.appendChild(el);
      });
    }

    document.getElementById("suche-input").addEventListener("input", () => {
      ladeNeuenBegriff();
      aktualisiereBegriffListe();
    });

    document.getElementById("kategorie-filter").addEventListener("change", () => {
      ladeNeuenBegriff();
      aktualisiereBegriffListe();
    });

    document.addEventListener("DOMContentLoaded", () => {
      ladeBegriffe();
    });