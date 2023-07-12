// fungsi untuk memeriksa apakah browser yang digunakan mendukung service worker
// jika mendukung, maka akan service worker akan diregistrasi dan dijalankan pada browser
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then((registration) => {
          console.log('Service Worker registration successful with scope: ', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed: ', error);
        });
    });
  }

// mendefinisikan URL API yang berisikan data produk yang akan diambil
const apiUrl = 'https://my-json-server.typicode.com/d17ns/demo/samsung';

// fungsi untuk membuat baris tabel berdasarkan data produk
// kemudian baris tabel tersebut diisikan dengan data produk yang akan diambil dari REST API
function createTableRow(data) {
  const { id, name, price, image } = data;

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>Rp ${price}</td>
    <td><img src="${image}" alt="${name}"></td>
  `;

  return row;
}

// fungsi untuk mengambil data dari REST API yang sebelumnya sudah didefinisikan URL-nya
// kemudian memanggil fungsi createTableRow() untuk membuat baris tabel dan mengisinya dengan data produk yang sudah diambil dari REST API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.querySelector('tbody');

    data.forEach((product) => {
      const row = createTableRow(product);
      tableBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });