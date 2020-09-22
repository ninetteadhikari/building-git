const fs = require('fs');
const path = require('path');
const Workspace = require('./Workspace.js');
const Database = require('./Database.js')
const Blob = require('./Blob.js')

// node jit.js init path/to/repository

const command = process.argv.slice(2);
let rootPath = '';
let gitPath = '';

switch (command[0]) {
  case 'init':
    let directoryPath;
    if (process.argv[3]) {
      directoryPath = process.argv.slice(3).join('');
    } else {
      directoryPath = process.cwd();
    }

    rootPath = path.resolve(directoryPath);
    gitPath = path.join(rootPath, '.git');

    directoryArray = ['objects', 'refs'];
    for (const dir of directoryArray) {
      fs.mkdir(path.join(gitPath, dir), { recursive: true }, (error) => {
        if (error) {
          console.error(error);
          process.exit(1);
        }
        console.log('Initialized empty Jit repository in ', gitPath);
        process.exit(0);
      });
    }
    break;
  case 'commit':
    rootPath = path.resolve(process.cwd());
    gitPath = path.join(rootPath, '.git');
    const dbPath = path.join(gitPath, 'objects');
    const workspace = new Workspace(rootPath);
    const workspaceFileList = workspace.listFiles();
    const database = new Database(dbPath)

    workspaceFileList.forEach(path=>{
      const data = workspace.readFile(path)
      const blob = new Blob(data)
      database.store(blob)
    })

    break;
  default:
    console.error(`jit: ${command} is not a jit command.`);
    process.exit(1);
}
