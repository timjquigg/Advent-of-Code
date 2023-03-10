class FileSystem {
  id;
  name;
  size;
  type;
  parent: FileSystem | null;
  children: FileSystem[];

  constructor(id: string, name: string, type = "dir", size = 0) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.type = type;
    this.parent = null;
    this.children = [];
  }

  addChild(child: FileSystem) {
    this.children.push(child);
    child.parent = this;
  }

  printTree(indent = 1) {
    let string = `${Array(indent).join("-")} ${this.name} `;
    if (this.type === "file") {
      string += `(file, size = ${this.size})`;
    }
    string += "\n";
    indent++;
    for (const subdir of this.children) {
      let subString = subdir.printTree(indent);
      string += subString;
    }
    return string;
  }

  getSize() {
    const children: FileSystem[] = this.getChildFiles();
    let size = children.reduce((curr: number, prev: FileSystem) => {
      return curr + prev.size;
    }, 0);
    return size;
  }

  getChildFiles(): FileSystem[] {
    let subs: FileSystem[] = [];
    if (this.type === "file") {
      subs.push(this);
      return subs;
    }
    for (const sub of this.children) {
      const subArr = sub.getChildFiles();
      subs = subs.concat(subArr);
    }

    return subs;
  }
}

const buildTree = (input: string[]) => {
  const fileTree: { [key: string]: FileSystem } = {
    0: new FileSystem("0", "/"),
  };
  let currentDir = fileTree[0];

  for (const i in input) {
    const line = input[i].split(" ");

    if (line[0] === "dir") {
      fileTree[i] = new FileSystem(i, line[1]);
      currentDir.addChild(fileTree[i]);
    }

    if (line[0].match(/\d+/)) {
      fileTree[i] = new FileSystem(i, line[1], "file", Number(line[0]));
      currentDir.addChild(fileTree[i]);
    }

    if (line[1] === "cd") {
      if (line[2] === "..") {
        const newCurrent = currentDir.parent as FileSystem;
        currentDir = newCurrent;
      } else if (line[2] === "/") {
        continue;
      } else {
        const newCurrent = currentDir.children.find(
          (child) => child.name === line[2]
        ) as FileSystem;
        currentDir = newCurrent;
      }
    }
  }

  return fileTree;
};

export const runtest = (inputStr: string) => {
  // Parsing Data
  const input = inputStr.split("\n").slice(0, -1);
  // console.log(input);

  // Build Tree:
  const fileTree = buildTree(input);

  // Get only directories:
  const directories = Object.values(fileTree).filter((el) => el.type === "dir");
  console.log(`Total size of tree is ${Object.keys(fileTree).length} items`);
  console.log(`Total number of directories is ${directories.length}`);

  const sizes = directories.map((el) => el.getSize());
  const totalSize = directories[0].getSize();
  console.log(`Total size on disk of root directory: ${totalSize}`);

  // Part #1:
  const smallSizes = sizes.filter((el) => el <= 100000);
  const totalSmallSizes = smallSizes.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
  console.log(`Total small directory size: ${totalSmallSizes}`);

  // Part #2
  const diskSize = 70000000;
  const updateSize = 30000000;

  const currentFreeSpace = diskSize - totalSize;
  const difference = updateSize - currentFreeSpace;

  console.log(`
    Total disk size         = ${diskSize}
    Update size             = ${updateSize}
    Free space available    = ${currentFreeSpace}
    Additional space needed = ${difference}
  `);

  sizes.sort((a, b) => a - b);

  const firstBigger = sizes.findIndex((el) => el >= difference);
  const newDifference = sizes[firstBigger] + currentFreeSpace;

  console.log(
    `Smallest directory large enough to meet space requirements is ${sizes[firstBigger]}. Removing that directory yields ${newDifference} space on disk.`
  );
};
