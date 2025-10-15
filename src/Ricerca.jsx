import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function Cinema() {
  const NOME_LISTA = "film";

  // USE STATE
  const [listaFilm, setListaFilm] = useLocalStorage(NOME_LISTA, []);

  // Variabili film
  const [titoloFilm, setTitoloFilm] = useState("");
  const [sala, setSala] = useState("");
  const [categoria, setCategoria] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [data, setData] = useState("");

  const [messaggio, setMessaggio] = useState("");
  const [modalitaModifica, setModalitaModifica] = useState(false);
  const [indiceModifica, setIndiceModifica] = useState(null);

  // state per ricerca filtrata e messaggi di ricerca
  const [filmFiltrati, setFilmFiltrati] = useState([]);
  const [messaggioRicerca, setMessaggioRicerca] = useState("");

  // Funzione per aggiungere o aggiornare un film
  function aggiungiFilm() {
    if (!titoloFilm.trim() || !sala.trim() || !categoria.trim()) return;

    const nuovoFilm = {
      titoloFilm: titoloFilm.trim(),
      sala: sala.trim(),
      categoria: categoria.trim(),
      prezzo: prezzo,
      data: data,
    };

    if (modalitaModifica) {
      setListaFilm((listIniziale) =>
        listIniziale.map((film, indice) =>
          indice === indiceModifica ? nuovoFilm : film
        )
      );
      setModalitaModifica(false);
      setMessaggio("Il film è stato modificato.");
    } else {
      setListaFilm((listIniziale) => [...listIniziale, nuovoFilm]);
      setMessaggio("Il film è stato aggiunto.");
    }

    pulisciCampi();
    setFilmFiltrati([]); // resetta risultati ricerca
    setMessaggioRicerca(""); // reset messaggio ricerca
  }

  // Funzione per modificare film
  function modificaFilm(indice) {
    setModalitaModifica(true);
    const filmDaModificare = listaFilm[indice];
    setTitoloFilm(filmDaModificare.titoloFilm);
    setSala(filmDaModificare.sala);
    setCategoria(filmDaModificare.categoria);
    setPrezzo(filmDaModificare.prezzo);
    setData(filmDaModificare.data);
    setIndiceModifica(indice);
  }

  // Pulisce i campi input
  function pulisciCampi() {
    setTitoloFilm("");
    setSala("");
    setCategoria("");
    setPrezzo("");
    setData("");
  }

  //  funzione per ricerca film
  function ricercaFilm() {
    // Controlla se tutti i campi sono vuoti
    if (!titoloFilm && !sala && !categoria && !prezzo && !data) {
      setFilmFiltrati([]);
      setMessaggioRicerca("Inserire almeno un criterio di ricerca");
      return;
    }

    const risultati = listaFilm.filter(
      (film) =>
        film.titoloFilm.toLowerCase().includes(titoloFilm.toLowerCase()) &&
        film.sala.toLowerCase().includes(sala.toLowerCase()) &&
        film.categoria.toLowerCase().includes(categoria.toLowerCase()) &&
        film.prezzo.toLowerCase().includes(prezzo.toLowerCase()) &&
        film.data.toLowerCase().includes(data.toLowerCase())
    );

    setFilmFiltrati(risultati);

    if (risultati.length === 0) {
      setMessaggioRicerca("Nessun film trovato");
    } else {
      setMessaggioRicerca("");
    }
  }

  // funzione per resettare la ricerca e mostrare tutti i film
  function resetRicerca() {
    setFilmFiltrati([]);
    setMessaggioRicerca("");
    pulisciCampi();
  }

  return (
    <div>
      <div>{messaggio}</div>
      <div>
        <input
          type="text"
          value={titoloFilm}
          placeholder="Inserisci titolo"
          onChange={(e) => setTitoloFilm(e.target.value)}
          required
        />
        <input
          type="text"
          value={sala}
          placeholder="Inserisci numero sala"
          onChange={(e) => setSala(e.target.value)}
          required
        />
        <input
          type="text"
          value={categoria}
          placeholder="Inserisci categoria"
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
        <input
          type="text"
          value={prezzo}
          placeholder="Inserisci prezzo"
          onChange={(e) => setPrezzo(e.target.value)}
          required
        />
        <input
          type="text"
          value={data}
          placeholder="Inserisci data"
          onChange={(e) => setData(e.target.value)}
          required
        />

        {/* Pulsanti gestione film */}
        {modalitaModifica ? (
          <button onClick={aggiungiFilm}>Aggiorna Film</button>
        ) : (
          <button onClick={aggiungiFilm}>Aggiungi film</button>
        )}

        {/* Bottone per ricerca film */}
        <button onClick={ricercaFilm}>Ricerca film</button>
        <button onClick={resetRicerca}>Reset ricerca</button>
      </div>

      <table border="1" style={{ padding: "10px" }}>
        <thead>
          <tr>
            <th>Titolo</th>
            <th>Sala</th>
            <th>Categoria</th>
            <th>Prezzo</th>
            <th>Data</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {/* Messaggio ricerca */}
          {messaggioRicerca && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "red" }}>
                {messaggioRicerca}
              </td>
            </tr>
          )}

          {/* Film filtrati */}
          {filmFiltrati.length > 0 &&
            filmFiltrati.map((film, indice) => (
              <tr key={indice}>
                <td>{film.titoloFilm}</td>
                <td>{film.sala}</td>
                <td>{film.categoria}</td>
                <td>{film.prezzo}</td>
                <td>{film.data}</td>
                <td>
                  <button onClick={() => modificaFilm(indice)}>Modifica</button>
                  <button>Elimina</button>
                </td>
              </tr>
            ))}

          {/* Lista completa se nessuna ricerca attiva */}
          {filmFiltrati.length === 0 &&
            !messaggioRicerca &&
            listaFilm.map((film, indice) => (
              <tr key={indice}>
                <td>{film.titoloFilm}</td>
                <td>{film.sala}</td>
                <td>{film.categoria}</td>
                <td>{film.prezzo}</td>
                <td>{film.data}</td>
                <td>
                  <button onClick={() => modificaFilm(indice)}>Modifica</button>
                  <button>Elimina</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}