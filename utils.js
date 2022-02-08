function parseBatch(responseCollection) {
  const boundary = "--batch_";
  const items = [];
  const responseLines = responseCollection.split(boundary);
  responseLines.forEach((value) => {
    const startJson = value.indexOf("{");
    const endJson = value.lastIndexOf("}");
    if (startJson < 0 || endJson < 0) {
      return;
    }
    let responseJson = value.substr(startJson, endJson - startJson + 1);
    responseJson = JSON.parse(responseJson);
    items.push(responseJson);
  });

  return items;
}

function chunkArray(myArray, chunk_size) {
  var results = [];
  array = myArray.slice();
  while (array.length) {
    results.push(array.splice(0, chunk_size));
  }
  return results;
}

module.exports = { parseBatch, chunkArray };
