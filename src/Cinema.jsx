import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function Cinema() {
  const NOME_LISTA = "film";

  //USE STATE
  const [listaFilm, setListaFilm] = useLocalStorage(NOME_LISTA, []);

  //variabili film
  const [titoloFilm, setTitoloFilm] = useState("");
  const [sala, setSala] = useState("");
  const [categoria, setCategoria] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [data, setData] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [modalitaModifica, setModalitaModifica] = useState(false);
  const [indiceModifica, setIndiceModifica] = useState(null);

  //funzioni
  function aggiungiFilm() {
    if (
      !titoloFilm.trim() ||
      !sala.trim() ||
      !categoria.trim() ||
      !prezzo.trim() ||
      !data.trim()
    )
      return;
    const nuovoFilm = {
      titoloFilm: titoloFilm.trim(),
      sala: sala.trim(),
      categoria: categoria.trim(),
      prezzo: prezzo.trim(),
      data: data.trim(),
    };

    if (modalitaModifica) {
      setListaFilm((listIniziale) =>
        listIniziale.map((film, indice) =>
          indice === indiceModifica ? nuovoFilm : film
        )
      );
      setModalitaModifica(false);
      setMessaggio("Il film è stato modificato.")
    } else {
      setListaFilm((listIniziale) => [...listIniziale, nuovoFilm]);
      setMessaggio("Il fiml è stato aggiunto");
    }

    pulisciCampi();
  }

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

  function pulisciCampi() {
    setTitoloFilm("");
    setSala("");
    setCategoria("");
    setPrezzo("");
    setData("");
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

        {modalitaModifica ? (
          <button onClick={aggiungiFilm}>Aggiorna Film</button>
        ) : (
          <button onClick={aggiungiFilm}>Aggiungi film</button>
        )}
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
          {listaFilm.map((film, indice) => (
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
