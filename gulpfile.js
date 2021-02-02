const gulp = require('gulp');
const reactFilesShortcut = require('./react-files-shortcut.js');

// LM: 2018-06-28
// Use to avoid "MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 finish listeners added. Use emitter.setMaxListeners() to increase limit" error.
// See: https://stackoverflow.com/questions/8313628/node-js-request-how-to-emitter-setmaxlisteners
require('events').EventEmitter.defaultMaxListeners = 15;


gulp.task('listen-for-react-file', () => {    
    console.log('React file shorcut listener is running...');  
    // React shorcut files maker watcher
    gulp.watch('./src/**/*.react').on('add', (reactShortcutFile) => {
        reactFilesShortcut(reactShortcutFile);
    });
});