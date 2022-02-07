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

module.exports = { parseBatch };
