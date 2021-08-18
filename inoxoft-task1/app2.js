const fs = require('fs');
const path = require('path');

const boysPath = path.join(__dirname, 'boys');
const girlsPath = path.join(__dirname, 'girls');

fs.readdir(boysPath, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    
    if (files.length === 0) {
        console.log('No files in directory');
        return;
    } 

    console.log("List of all files in folder boys: \n", files, "\n");

    files.forEach(file => {
        const currentFilePath = path.join(boysPath, file);

        fs.readFile(currentFilePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!JSON.parse(data).gender) 
            return console.log(`Gender in ${file} has not found`);

            if (JSON.parse(data).gender === 'female') {
            
                fs.rename(currentFilePath, girlsPath + '/' + file, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
        
                    console.log(`${file} has moved to folder girls`);
                });
            } else if (JSON.parse(data).gender === 'male') {
                console.log(`${file} still in folder boys`);
                return;                  
            }
        });
    });
});

fs.readdir(girlsPath, (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    
    if (files.length === 0) {
        console.log('No files in directory');
        return;
    } 

    console.log("List of all files in folder girls: \n", files, "\n");

    files.forEach(file => {
        const currentFilePath = path.join(girlsPath, file);

        fs.readFile(currentFilePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!JSON.parse(data).gender) 
            return console.log(`Gender in ${file} has not found`);

            if (JSON.parse(data).gender === 'male') {
            
                fs.rename(currentFilePath, boysPath + '/' + file, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
        
                    console.log(`${file} has moved to folder boys`);
                });
            } else if (JSON.parse(data).gender === 'female') {
                console.log(`${file} still in folder girls`);
                return;                  
            }
        });
    });
});