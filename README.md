4cast — prognozy i podsumowania pogodowe

To aplikacja webowa umożliwiająca:

wybór lokalizacji na mapie
pobranie prognozy pogody na najbliższy tydzień
wyświetlenie podsumowania tygodniowego
Projekt podzielony jest na dwie części: frontend — React + Vite backend — serwer Deno (z Oak), który pobiera dane z open-meteo.com i je przetwarza.

Aktualnie otwarta część to frontend

Jak uruchomić projekt? 
Wymagania:
- Node.js (>= 16) 
- npm

Uruchomienie frontendu (Vite): Przejdź do katalogu frontendu (tam gdzie jest package.json).
Zainstaluj zależności: npm install
Uruchom aplikację: npm run dev

Aplikacja otworzy się pod adresem: http://localhost:5173

Testy odpala się poprzez: npm run test