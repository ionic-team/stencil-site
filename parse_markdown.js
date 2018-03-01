const fs = require('fs');

fs.readdir('src/docs-md/', (err, files) => {
  if (err) {
    console.log(`Something went wrong: ${err}`)
  } else {
    files.forEach((file) => {
      fs.readdir(`${file}/`, (err, files) => {
        if (err) {
          console.log(`Something went wrong: ${err}`)
        } else {
          console.log(files);
        }
      })
    })
  }
})