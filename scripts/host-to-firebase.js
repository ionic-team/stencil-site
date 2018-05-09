const fs = require('fs');

fs.readFile('www/host.config.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(`Something went wrong: ${err}`)
  } else {
    const headerData = JSON.parse(data).hosting.rules;

    fs.readFile('firebase.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(`Something went wrong: ${err}`);
      } else {
        const firebaseData = JSON.parse(data);
        firebaseData.hosting.headers = [];
        headerData.map((entry) => {

          const newHeaderObject = {
            source: entry.include,
            headers: [{
              "key": "Link",
              "value": ""
            }]
          }

          const headerValues = [];
          entry.headers.forEach((header) => {
            headerValues.push(header.value);
          });

          const commaValues = headerValues.join(',');
          newHeaderObject.headers[0].value = commaValues;

          console.log(headerValues);

          firebaseData.hosting.headers.push(newHeaderObject);
        });

        fs.writeFile('firebase.json', JSON.stringify(firebaseData), 'utf8', (err) => {
          if (err) {
            console.log(`Something went wrong: ${err}`);
          } else {
            console.log('success');
          }
        });
      }
    });
  }
})