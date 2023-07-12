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

// Define the API URL
const apiUrl = 'https://my-json-server.typicode.com/d17ns/demo/samsung';

// Function to create table rows
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

// Fetch data from the API and populate the table
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