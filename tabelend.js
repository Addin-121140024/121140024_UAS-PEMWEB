// Fetch and display the data from the server when the page loads
window.onload = function() {
  fetch('path-to-your-server/get-data.php').then(response => {
    return response.json(); // assuming the server sends back JSON data
  }).then(data => {
    const tbody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    data.forEach((row, index) => {
      const tr = tbody.insertRow();
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td contenteditable="true" onBlur="saveData(this, 'tanggal', ${row.id})">${row.tanggal}</td>
        <td contenteditable="true" onBlur="saveData(this, 'kegiatan', ${row.id})">${row.kegiatan}</td>
        <td contenteditable="true" onBlur="saveData(this, 'keterangan', ${row.id})">${row.keterangan}</td>
        <td contenteditable="true" onBlur="saveData(this, 'unit', ${row.id})">${row.unit}</td>
        <td contenteditable="true" onBlur="saveData(this, 'total', ${row.id})">${row.total}</td>
        <td><button onClick="deleteRow(this, ${row.id})">Delete</button></td>
      `;
    });
  }).catch(error => {
    console.error('Error:', error);
  });
};

// Function to save data when a cell's content is edited
function saveData(element, column, id) {
  const value = element.textContent;
  fetch('path-to-your-server/save-data.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, column, value }),
  }).then(response => response.text())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to delete a row
function deleteRow(btn, id) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);

  // Also delete from the server
  fetch('path-to-your-server/delete-data.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then(response => response.text())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
