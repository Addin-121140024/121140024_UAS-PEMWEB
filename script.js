document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and display the data
    function fetchData() {
      fetch('fetch_data.php')
        .then(response => response.json())
        .then(data => {
          const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
          tableBody.innerHTML = ''; // Clear existing table data
          data.forEach((row, index) => {
            const tr = tableBody.insertRow();
            tr.innerHTML = `
              <td>${index + 1}</td>
              <td>${row.tanggal}</td>
              <td>${row.kegiatan}</td>
              <td>${row.keterangan}</td>
              <td>${row.unit}</td>
              <td>${row.total}</td>
              <td class='action-buttons'>
                  <button class='edit-btn' data-id='${row.id}'>Ubah</button>
                  <button class='delete-btn' data-id='${row.id}'>Hapus</button>
              </td>
            `;
          });
          attachEventHandlers();
        })
        .catch(error => console.error('Error:', error));
    }
  
    // Function to attach event handlers to edit and delete buttons
    function attachEventHandlers() {
      const editButtons = document.getElementsByClassName('edit-btn');
      const deleteButtons = document.getElementsByClassName('delete-btn');
  
      Array.from(editButtons).forEach(button => {
        button.addEventListener('click', function() {
          const row = this.parentNode.parentNode;
          const cells = row.getElementsByTagName('td');
          Array.from(cells).forEach((td, index) => {
            if (index > 0 && index < cells.length - 1) { // Make cells editable except 'No' and 'Actions'
              td.contentEditable = true;
            }
          });
          this.textContent = 'Save';
          this.classList.add('save-btn');
          this.classList.remove('edit-btn');
          this.removeEventListener('click', arguments.callee); // Remove current event listener
          this.addEventListener('click', saveData); // Add new event listener for save
        });
      });
  
      Array.from(deleteButtons).forEach(button => {
        button.addEventListener('click', function() {
          if (confirm('Are you sure you want to delete this record?')) {
            const id = this.dataset.id;
            fetch('delete_data.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: `id=${id}`
            })
            .then(response => response.text())
            .then(() => {
              fetchData(); // Refresh data after delete
            })
            .catch(error => console.error('Error:', error));
          }
        });
      });
    }
  
    // Function to save data
    function saveData() {
      const row = this.parentNode.parentNode;
      const id = this.dataset.id;
      const cells = row.getElementsByTagName('td');
      const data = {
        id: id,
        tanggal: cells[1].textContent,
        kegiatan: cells[2].textContent,
        keterangan: cells[3].textContent,
        unit: cells[4].textContent,
        total: cells[5].textContent
      };
  
      fetch('update_data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${data.id}&tanggal=${data.tanggal}&kegiatan=${data.kegiatan}&keterangan=${data.keterangan}&unit=${data.unit}&total=${data.total}`
      })
      .then(response => response.text())
      .then(() => {
        fetchData(); // Refresh data after save
      })
      .catch(error => console.error('Error:', error));
    }
  
    fetchData(); // Initial data fetch
  });
  