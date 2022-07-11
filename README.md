# Movie Watchlist

Aplikasi ini merupakan aplikasi web untuk menambahkan film/TV series ke dalam watchlist serta menandakan watchlist yang sudah tertonton. Data film dan TV series didapatkan dari [OMBD API](http://www.omdbapi.com/).

# Cara Penggunaan

## Instalasi
Menjalankan aplikasi dapat dilakukan dengan menginstalasi package yang diperlukan terlebih dahulu
```sh
npm install
```
Lalu sebelum menjalankan aplikasi, perlu dinyalakan server [json-server](https://github.com/typicode/json-server) menggunakan command
```sh
cd utils
json-server --watch db.json --port 3004
```
Di terminal yang berbeda, lalu jalankan aplikasi menggunakan command
```sh
npm run dev
```

## Data Login

Data login yang dapat digunakan baru terdapat satu akun, yaitu dengan
```
username: 'Mark'
password: 1234
```