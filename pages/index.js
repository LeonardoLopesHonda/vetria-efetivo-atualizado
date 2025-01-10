import xlsxReadFile from "read-excel-file";

function Home() {
  function handleClick() {
    const input = document.getElementById("excel_file");
    xlsxReadFile(input.files[0]).then((data) => {
      const headers = data[0];
      const json_data = [];
      for (let i = 1; i < data.length; i++) {
        const temp = {};
        for (let j = 0; j < headers.length; j++) {
          temp[headers[j]] = data[i][j];
        }
        json_data.push(temp);
      }
      console.log(json_data);
      document.getElementById("json_data").value = JSON.stringify(
        json_data,
        null,
        2,
      );
    });
  }

  return (
    <div>
      <h1>Adicione seu arquivo Excel aqui:</h1>
      <input type="file" id="excel_file" accept=".xlsx, .xls" />
      <button onClick={handleClick}>Convert to JSON</button>
      <textarea id="json_data" rows="10" cols="50" readOnly></textarea>
    </div>
  );
}

export default Home;
