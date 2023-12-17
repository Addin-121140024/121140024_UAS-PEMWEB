// ... existing JavaScript from script.js ...

// Function to update total sum
function updateTotalSum() {
    var total = 0;
    document.querySelectorAll('#dataTable tbody tr').forEach(row => {
      total += parseInt(row.cells[5].textContent.replace(/\./g, '')) || 0;
    });
    document.getElementById('totalSum').textContent = new Intl.NumberFormat('id-ID').format(total);
  }
  
  // Function to make a cell editable
  function makeEditable(cell) {
    cell.onclick = function() {
      var input = document.createElement('input');
      input.value = cell.textContent;
      cell.textContent = '';
      cell.appendChild(input);
  
      input.addEventListener('blur', function() {
        cell.textContent = this.value;
        updateTotalSum();
      });
  
      input.focus();
    };
  }
  
  // Function to add a new row
  function addRow(tanggal, kegiatan, keterangan, unit, total) {
    var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cellIndex = 0;
  
    newRow.insertCell(cellIndex++).textContent = table.rows.length; // No
    newRow.insertCell(cellIndex++).textContent = tanggal; // Tanggal
    newRow.insertCell(cellIndex++).textContent = kegiatan; // Kegiatan
    newRow.insertCell(cellIndex++).textContent = keterangan; // Keterangan
    newRow.insertCell(cellIndex++).textContent = unit; // Unit
    var totalCell = newRow.insertCell(cellIndex++); // Total
    totalCell.textContent = new Intl.NumberFormat('id-ID').format(parseInt(total));
    makeEditable(totalCell); // Make the Total cell editable
  
    var actionCell = newRow.insertCell(cellIndex++); // Actions
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
      // Make all cells in the row editable
      for (var i = 1; i < newRow.cells.length - 1; i++) {
        makeEditable(newRow.cells[i]);
      }
    };
    actionCell.appendChild(editButton);
    
    updateTotalSum();
  }
  
  // Example of adding rows (this would be done dynamically in your actual code)
  addRow('12/28/2023', 'kegiatan 1', 'bertani', '10', '8000000');
  // ... add other rows ...
  
  // Update the total sum whenever a new row is added
  updateTotalSum();
  