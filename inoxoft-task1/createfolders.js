const fs = require('fs');
const path = require('path');

const girlsPath = path.join(__dirname, 'file-db', 'girls');
const boysPath = path.join(__dirname, 'file-db', 'boys');

function createFolders () {
  fs.mkdir(girlsPath,
      { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Directory created successfully!');
      }
  );

  fs.mkdir(boysPath,
      { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Directory created successfully!');
      }
  );
};

module.exports = {
    girlsPath,
    boysPath,
    createFolders,
}