require('dotenv').config();
const {getInput} = require('./getInput');

const day = 7;
const cookie = process.env.COOKIE;

class FileSystem {
  constructor(name, type = 'dir', size = 0) {
    this.name = name;
    this.size = size;
    this.type = type;
    this.parent = null;
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
  }

  printTree(indent = 1) {
    let string = `${Array(indent).join('-')} ${this.name} `;
    if (this.type === 'file') {
      string += `(file, size = ${this.size})`;
    }
    string += '\n';
    indent++;
    for (const subdir of this.children) {
      let subString = subdir.printTree(indent);
      string += subString;
    }
    return string;
  }

  getSize() {
    const children = this.getChildFiles();
    let size = children.reduce((curr, prev) => {
      return curr + prev.size;
    },0);
    return size;
  }

  getChildFiles() {
    let subs = [];
    if (this.type === 'file') {
      subs.push(this);
      return subs;
    }
    for (const sub of this.children) {
      const subArr = sub.getChildFiles();
      subs = subs.concat(subArr);
    }

    return subs;
  }

  print() {
    let children = '';
    for (const child of this.children) {
      children += `name: ${child.name}, size: ${child.size}\n\t`;
    }
    const string = `
    name: ${this.name}
    type: ${this.type}
    parent: ${this.parent ? this.parent.name : null}
    children: 
        ${children}
    `;
    console.log(string);
  }

}

const buildTree = (input) => {
  const directories = [new FileSystem('/')];
  const history = [];
  let parent;

  for (const i in input) {
    const line = input[i].split(' ');
    // console.log(line);
    if (line[0] === '$') {
      
      if (line[1] === 'cd') {
        
        if (line[2] === '..') {
          history.pop();
          
        } else {
          history.push(line[2]);
          
        }
        parent = history.slice(-1)[0];
      }
      
    }
    
    if (line[0] === 'dir') {
      directories.push(new FileSystem(line[1]));
      const possibleParents = directories.filter(el => {
        return el.name === parent;
      });
      const thisParent = possibleParents.slice(-1)[0];
      thisParent.addChild(directories.slice(-1)[0]);
    }
    
    if (line[0].match(/\d+/)) {
      directories.push(new FileSystem(line[1], 'file', Number(line[0])));
      const possibleParents = directories.filter(el => {
        return el.name === parent;
      });
      const thisParent = possibleParents.slice(-1)[0];
      thisParent.addChild(directories.slice(-1)[0]);
    }
    // console.log({history});
    // console.log({parent});
  }

  const tree = directories[0].printTree();
  console.log(tree);

  const dirs = directories.filter(el => el.type === 'dir');

  const children = dirs.map(el => {
    console.log(el.name);
    return el.getChildFiles();
  });
  console.log(children);
};

getInput(day, cookie)
  .then((response) => {

    // Parsing Data
    const input = response.data.split('\n').slice(0,-1);
    //     const input =
    // `$ cd /
    // $ ls
    // dir a
    // 14848514 b.txt
    // 8504156 c.dat
    // dir d
    // $ cd a
    // $ ls
    // dir e
    // 29116 f
    // 2557 g
    // 62596 h.lst
    // $ cd e
    // $ ls
    // 584 i
    // $ cd ..
    // $ cd ..
    // $ cd d
    // $ ls
    // 4060174 j
    // 8033020 d.log
    // 5626152 d.ext
    // 7214296 k`.split('\n');
   
    // console.log(input);
    buildTree(input);
  });