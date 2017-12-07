import path from 'path';
import fs from 'fs';

export default {

  getRootPath : function() {
    return path.resolve();
  },

  getDefaultPath : function(filename) {
    return path.resolve(this.getRootPath(), filename);
  },

  isNodeModulePath(modulePath){
    return (modulePath.indexOf('node_modules') >= 0);
  },

  getFilePath(filename) {
    return path.resolve(filename);
  },

  isFileExist: function(filename) {
    return fs.existsSync(this.getFilePath(filename));
  },

  readFile: function (filepath) {
    return fs.readFileSync(filepath, 'utf8');
  },

  writeFile: function(filepath, content) {
    try {
        fs.writeFileSync(filepath, content);
        return true;
    } catch (e) {
        return e;
    }
  },

  parseJson: function(content) {
    let parsedContent;

    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      parsedContent = false;
    }

    return parsedContent;
  }
}
