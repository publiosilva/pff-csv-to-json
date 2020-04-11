const csvTextarea = document.getElementById('csv-textarea');
const jsonTextarea = document.getElementById('json-textarea');

function csvSyntaxTextIsValid(csvSyntaxText) {
  return !(/^(\,|\r?\n|\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\,\r\n]*))$/.test(csvSyntaxText));
}

function validateFields(isCsvSyntaxTextValid) {
  if (isCsvSyntaxTextValid) {
    csvTextarea.classList.remove('invalid');
    csvTextarea.classList.add('valid');
  } else {
    csvTextarea.classList.remove('valid');
    csvTextarea.classList.add('invalid');
  }
}

function clearFieldsValidation() {
  csvTextarea.classList.remove('valid');
  csvTextarea.classList.remove('invalid');
}

function convertCsvToJson(csvSyntaxText) {
  const json = [];

  let [header, ...rows] = csvSyntaxText.split('\n');
  header = header.split(',');

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].split(',');
    const obj = {};

    for (let j = 0; j < header.length; j++) {
      obj[header[j]] = row[j] || null;
    }

    json.push(obj);
  }

  return JSON.stringify(json, null, 2);
}

function handleSubmit() {
  const csvSyntaxText = csvTextarea.value;
  const isCsvSyntaxTextValid = csvSyntaxTextIsValid(csvSyntaxText);

  validateFields(isCsvSyntaxTextValid);

  if (isCsvSyntaxTextValid) {
    const jsonStr = convertCsvToJson(csvSyntaxText);

    jsonTextarea.value = jsonStr;
    M.textareaAutoResize(jsonTextarea);
    jsonTextarea.nextElementSibling.classList.add('active');

    clearFieldsValidation();

    csvTextarea.value = '';
    M.textareaAutoResize(csvTextarea);
  }
}