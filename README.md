<!DOCTYPE html>
<html>
<head>
  <title>UID Generator</title>
</head>
<body>
  <h2>UID Generator from Google Sheets</h2>
  <button id="getData">Get Data & Generate UID</button>
  <pre id="output"></pre>

  <script>
    document.getElementById('getData').addEventListener('click', () => {



      // const sheetId = "19xOa5f9LAvh_TQnXU0TJ6R3_hrtE95wTa03Bc2JRCfI"; // Your Sheet ID
      // https://docs.google.com/spreadsheets/d/1eyvlc9obybAnU3maZPCO4EZcELqmFP7m2k1Xx-vULSo/edit?usp=sharing
      const sheetId = "1eyvlc9obybAnU3maZPCO4EZcELqmFP7m2k1Xx-vULSo"; // Your Sheet ID
      const gid = "0"; // First sheet/tab
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;


      fetch(url)
        .then(res => res.text())
        .then(data => {
          // Remove Google’s extra characters
          const json = JSON.parse(data.substr(47).slice(0, -2));
          const rows = json.table.rows;

          // Get the last non-empty row
          const lastRow = rows[rows.length - 1];

          // Check if row exists and format
          if (lastRow) {
            // const values = lastRow.c.map(cell => cell?.v ?? "").join(" - ");
            const values = lastRow.c[1].v;
            document.getElementById("output").textContent = `registration number: \n${values}
            new registration number: \n${getNextRegistrationNumber(values)}`;


          } else {
            document.getElementById("output").textContent = "No data found.";
          }
        })
        .catch(err => {
          console.error("Error: ", err);
          document.getElementById("output").textContent = "Error fetching data.";
        });
    });


    function getNextRegistrationNumber(currentRegNumber) {
    // Split the registration number by '-'
    const parts = currentRegNumber.split('-'); // ["AS", "SP", "202509", "0001"]

    // Extract and increment the serial number
    let serialNumber = parseInt(parts[3], 10); // Convert "0001" to 1
    serialNumber += 1;

    // Pad the new serial number to 4 digits
    const newSerial = serialNumber.toString().padStart(4, '0'); // "0002"

    // Build the new registration number
    const newRegNumber = `${parts[0]}-${parts[1]}-${getCurrentYearMonth()}-${newSerial}`;
    
    return newRegNumber;
    
    }

    function getCurrentYearMonth() {
    const now = new Date(); // Current date
    const year = now.getFullYear(); // e.g., 2025
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 01–12
    return `${year}${month}`; // e.g., "202509"
}
  </script>
</body>
</html>
