const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, 'upload');
const girlsPath = path.join(__dirname, 'file-db', 'girls');
const boysPath = path.join(__dirname, 'file-db', 'boys');

fs.readdir(uploadPath, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    
    if (files.length === 0) {
        console.log('No files in directory');
        return;
    } 

    console.log("List of all files in folder upload: \n", files, "\n");

    files.forEach(file => {
        const currentFilePath = path.join(uploadPath, file);

        fs.readFile(currentFilePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            if (JSON.parse(data).gender === 'female') {
            
                fs.rename(currentFilePath, girlsPath + '/' + file, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
        
                    console.log(`${file} has moved to file-db/girls`);
                });
            } else if (JSON.parse(data).gender === 'male') {
                
                fs.rename(currentFilePath, boysPath + '/' + file, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
        
                    console.log(`${file} has moved to file-db/boys`);
                });
            } else {
                return console.log(`Gender in ${file} has not found`);
            }
        });
    });
});