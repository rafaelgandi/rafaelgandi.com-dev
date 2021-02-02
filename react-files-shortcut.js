/*
    This script automatically creates all the react domponent boilerplate. It warcher for the creation of 
    "ComponentName.react" file and automatically replaces it the boilerplate files.
*/
const fs = require('fs');
const path = require('path');

function directoryExists(filePath) {
    return fs.existsSync(filePath);
}

function getComponentName(filePath) {
    filePath = filePath.replace('.react', '').trim();
    return filePath.split(path.sep).pop().trim();
}

function makeDir(dirPath, onAfterCreate) {
    fs.mkdir(dirPath, { recursive: true }, (error) => {
        if (error) {
            console.log(`Unable to make directory "${ dirPath }".`);
            return;
        }
        onAfterCreate();
    });
}

function makeFile(filePath, fileContents, onAfterCreate) {
    fs.writeFile(filePath, fileContents,  (error) => {
        if (error) {
            console.log(`Unable to make file "${ filePath }".`);
            return;
        }
        onAfterCreate();
    });
}

module.exports = function (pathToReactShortcutFile) {
    const dir = path.dirname(pathToReactShortcutFile);
    const componentName = getComponentName(pathToReactShortcutFile);
    if (directoryExists(dir + path.sep + componentName)) { 
        console.log('Directory ' + dir + ' already exists');
        return; 
    }
    const componentFileContents = `
import React from 'react';
import PropTypes from 'prop-types';
import './styles/${ componentName }.scss';

export default function ${ componentName }(props) {
    return (
        <></>
    );
}
${ componentName }.propTypes = {};
    `;
    const componentDir = dir + path.sep + componentName;
    const componentFile = componentDir + path.sep + componentName + '.jsx';
    const componentStylesDir = componentDir + path.sep + 'styles';
    const componentStylesSCSS = componentStylesDir + path.sep + componentName + '.scss';
    // Create all the boilerplate files //
    makeDir(componentDir, () => {
        makeFile(componentFile, componentFileContents, () => {
            makeDir(componentStylesDir,  () => {
                makeFile(componentStylesSCSS, '// Component styles go here', () => {
                    fs.unlinkSync(pathToReactShortcutFile); // remove shortcut file;
                    console.log(`React shortcut done! [${pathToReactShortcutFile}]`);
                });
            });
        });
    });
};