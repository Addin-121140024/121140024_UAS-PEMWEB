document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Retrieve form data
    var tanggal = document.getElementById('tanggal').value;
    var kegiatan = document.getElementById('kegiatan').value;
    var keterangan = document.getElementById('kegiatan').value;
    var unit = document.getElementById('unit').value;
    
    // Save the data (for demonstration purposes, this will just be in-memory)
    var table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    
    newRow.insertCell(0).appendChild(document.createTextNode(tanggal));
    newRow.insertCell(1).appendChild(document.createTextNode(kegiatan));
    newRow.insertCell(2).appendChild(document.createTextNode(keterangan));
    newRow.insertCell(3).appendChild(document.createTextNode(unit));
    
    // Clear the form
    document.getElementById('dataForm').reset();
  });
  