import {useState, useEffect} from "react"
import { useLocalStorage } from "./useLocalStorage";


export default function Cinema(){
    const NOME_LISTA = "film";

//USE STATE 
const [listaFilm,setListaFilm] = useLocalStorage(NOME_LISTA, []);

//variabili film
const [titoloFilm, setTitoloFilm] = useState("");
const [sala, setSala] = useState("");
const [categoria,setCategoria] = useState("");
const [prezzo,setPrezzo] = useState("");
const [data,setData] = useState("");


return (
<div>
  <input type="text" value={titoloFilm} placeholder="Inserisci titolo" onChange={(e) => setTitoloFilm(e.target.value)} required />
  <input type="text" value={sala} placeholder="Inserisci numero sala" onChange={(e) => setSala(e.target.value)} required />
  <input type="text" value={categoria} placeholder="Inserisci categoria" onChange={(e) => setCategoria(e.target.value)} required />
  <input type="text" value={prezzo} placeholder="Inserisci prezzo" onChange={(e) => setPrezzo(e.target.value)} required />
  <input type="text" value={data} placeholder="Inserisci data" onChange={(e) => setData(e.target.value)} required />

 <button>Aggiungi film</button>
    
<table border="1" style={{"padding":"10px"}}>
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
    {listaFilm.map((film, indice)=>(
        <tr key={indice}>
        <td>{film.titoloFilm}</td>
        <td>{film.sala}</td>
        <td>{film.categoria}</td>
        <td>{film.prezzo}</td>
        <td>{film.data}</td>
        <td>
          <button>Modifica</button>

          <button>Elimina</button>  
        </td>


        </tr>
    ))}
</tbody>

</table>


</div>
);

}