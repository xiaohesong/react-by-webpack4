const fs = require('fs-extra');
const paths = require('./paths');

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}

fs.emptyDirSync(paths.appBuild);
copyPublicFolder()