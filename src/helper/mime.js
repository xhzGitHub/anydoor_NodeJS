const path = require('path');
const mimeTypes = {
    'css': 'text/css',
    'js': 'text/javascript',
    'html': 'text/html',
    'jpg': 'image/jpg',
    'txt': 'text/plain'
}

module.exports = (filepath) => {
    let ext = path.extname(filepath).split('.').pop().toLowerCase();
    if(!ext){
        ext = filepath;
    }
    return mimeTypes[ext] || mimeTypes['txt'];
}