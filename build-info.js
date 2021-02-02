// LM: 2020-09-08 14:52:56 [Added a simple way to add vars to final build index.html]
const fs = require('fs');
const datetimeStr = (new Date()).toString();
const indexFile = './build/index.html';

fs.readFile(indexFile, 'utf8', function (err, data) {
    if (err) {
        console.error(err);
    }
    const newMarkUp = data.replace(/\$BUILD_INFO_DATE/ig, datetimeStr);
    fs.writeFile(indexFile, newMarkUp,  (error) => {
        if (error) {
            console.log(`Unable to make file "${ indexFile }".`);
            return;
        }
        console.log('Build info added!');
    });
}); 