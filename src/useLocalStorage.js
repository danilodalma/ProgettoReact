  import { useState, useEffect } from "react";

  // Hook per l'utilizzo del LocalStorage come contenitore di memorizzazione degli stati di un componente
  // Si comporta esattamente come lo useState, ma invece di memorizzare il dato nella memoria temporanea della pagina,
  // memorizza il dato in LocalStorage in modo da renderlo disponibile successivamente.

  export const useLocalStorage = (storageKey, fallbackState) => {
    // carica la variabile dal LocalStorage e nel caso non esista, la imposta in base al valore passato in fallBackState
    const [value, setValue] = useState(
      JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
    );

    // Effect per impostare il setItem e rendere permanente la memorizzazione
    useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    // ritorna la coppia [value, setValue] (il setValue è lo stesso ritornato dalla useState)
    return [value, setValue];
  };