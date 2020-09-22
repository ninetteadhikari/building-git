const fs = require('fs');
const path = require('path');

class Workspace {
  constructor(pathname) {
    this.pathname = pathname;
    // this.ignore = ['.', '..', '.git'];
  }

  listFiles() {
    fs.readdir(this.pathname, (error, files) => {
      if (error) {
        console.error(error);
      } else {
        const list = files.filter((item) => !/(^|\/)\.[^\/\.]/g.test(item)); // remove hidden files
        list.map((file) => {
          console.log(file);
          return file
        });
      }
    });
  }

  readFile(filePath) {
    fs.readFile(path.join(this.pathname, filePath), (error, data) => {
      if (error) {
        console.error(error);
      }
      console.log(data);
    });
  }
}

module.exports = Workspace;
