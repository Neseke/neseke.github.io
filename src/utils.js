function parseToJSON(csv) {
  const props = csv[0]; // first row contains the header names (= properties)
  const data = csv.slice(1); // following rows contain the data

  return data.reduce((acc, dataArr) => {
    const set = props.reduce((scndAcc, prop, i) => {
      scndAcc[prop] = dataArr[i];
      return scndAcc;
    }, {});
    acc = [...acc, set];
    return acc;
  }, []);
}

function loadPartnersFromSheet(callback, errorCallback) {
  setTimeout(() => {
    window.gapi.client.load('sheets', 'v4', async () => {
      return window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: '1ud2HaVa5_WoZHWWgGsNe2CUOhwSQ2yERcdCuO5J7n9k',
          range: 'A1:E'
        })
        .then(response => {
          const { values } = response.result;
          callback(parseToJSON(values));
        })
        .catch(errorCallback);
    });
  }, 300);
}

function getPartners(callback, errorCallback) {
  loadPartnersFromSheet(partners => {
    callback(partners);
  }, errorCallback);
}

export default getPartners;
