const fs = require('fs');

fs.readFile('www/host.config.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(`Something went wrong: ${err}`);
  } else {
    const headerData = JSON.parse(data).hosting.rules;

    fs.readFile('firebase.json', 'utf-8', (err, data) => {
      if (err) {
        console.log(`Something went wrong: ${err}`);
      } else {
        const firebaseData = JSON.parse(data);
        firebaseData.hosting.headers = [];
        headerData.map(entry => {
          const requestPath = {
            source: entry.include,
            headers: []
          };
          
          entry.headers.map((header) => {
            const headerObject = {
              "key": header.name,
              "value": header.value 
            }
            requestPath.headers.push(headerObject);
          });

          firebaseData.hosting.headers.push(requestPath);
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
});