import fs from 'fs'

class FileSystemContainer {
    filePath: string;
   
     constructor(filePath: string) {
       this.filePath = filePath;

       if (!fs.existsSync(`./${this.filePath}`)) {
        fs.promises
          .writeFile(`./${this.filePath}`, ``)
          .then(() => console.log(`${this.filePath} created`));
    }
    }
 
 }
 
 export default FileSystemContainer