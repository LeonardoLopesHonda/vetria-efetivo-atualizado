import xlsxReadFile from "read-excel-file";

function Home() {
  async function convert_xlsx(input, json_data) {
    await xlsxReadFile(input).then((data) => {
      const headers = data[0];
      // const json_data = [];
      for (let i = 1; i < data.length; i++) {
        const temp = {};
        for (let j = 0; j < headers.length; j++) {
          temp[headers[j]] = data[i][j];
        }
        json_data.push(temp);
      }
      // console.log(...json_data);
    });
  }

  async function handleClick() {
    const input = document.getElementById("excel_file");
    const textarea = document.getElementById("json_data");
    const file = input.files[0];
    const file_name = file.name.split(".");
    const file_format = file_name[file_name.length - 1];
    const json_data = [];

    await convert_xlsx(file, json_data);

    textarea.value = JSON.stringify(json_data, null, 2);
  }

  return (
    <div>
      <h1>Adicione seu arquivo Excel aqui:</h1>
      <input type="file" id="excel_file" accept=".xlsx, .xls, .csv" />
      <button onClick={handleClick}>Convert to JSON</button>
      <textarea id="json_data" rows="10" cols="50" readOnly></textarea>
    </div>
  );
}

export default Home;
