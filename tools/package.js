import path from 'node:path';
import {
  readFileSync as read,
  writeFileSync as write,
  mkdirSync as mkdir,
  existsSync as exists,
  rmdirSync as rmdir,
  cpSync as cp,
  rmSync as rm
} from 'node:fs';
import { default as ejs } from 'ejs';
import { default as Zip } from 'adm-zip';
import { fileURLToPath } from 'node:url';

const TEMPLATE_FILE_NAME = 'index.liquid.ejs'
const BUILD_PATH = '../build';
const PACKAGE_PATH = '../package';


const templateFilePath = fileURLToPath(new URL(`./template/${TEMPLATE_FILE_NAME}`, import.meta.url));

const templateFile = read(templateFilePath, 'utf8');
const compiledTemplate = ejs.compile(templateFile, {
  filename: templateFilePath,
  outputFunctionName: 'echo'
});

const baseFilePath = fileURLToPath(new URL(BUILD_PATH, import.meta.url));
const packageFilePath = fileURLToPath(new URL(PACKAGE_PATH, import.meta.url));
// exclude files from static copies
const excludedFiles = [
  path.join(packageFilePath, TEMPLATE_FILE_NAME)
]

function fileLoader (filePath) {
  try {
    const fullPath = path.join(baseFilePath, filePath);
    excludedFiles.push(path.join(packageFilePath, filePath));
    return read(fullPath, 'utf8');
  } catch (err) {
    return `Unable to find template: ${filePath}`;
  }
}

try {
  // Compile template
  console.log('Compiling template');
  const ret = compiledTemplate({
    include: fileLoader
  });

  // Create packages folder
  console.log(`Creating output folder: ${packageFilePath}`);
  if (exists(packageFilePath)) {
    rm(packageFilePath, { recursive: true });
  }
  mkdir(packageFilePath);

  // write template
  console.log('Saving compiled index.liquid')
  const savePath = path.join(packageFilePath, 'index.liquid');
  write(savePath, ret);

  // copy any assets
  cp(baseFilePath, packageFilePath, {
    recursive: true,
    force: true,
    filter: (src, dest) => {
      // exclude files used in the template as includes
      if (!excludedFiles.includes(dest)) {
        const outputPath = src.replace(baseFilePath, '')
        outputPath !== '' && console.log(`Copying asset: ${outputPath}`)
        return true;
      }
      return false;
    }
  })

  // Zip the package
  console.log('Generating zip package')
  let zip = new Zip()
  zip.addLocalFolder(packageFilePath, '/');

  const zipLocation = fileURLToPath(new URL(`../package.zip`, import.meta.url))
  zip.writeZip(zipLocation)
  console.log(`Saved package to: ${zipLocation}`)

  console.log('Packaging Completed');
} catch (err) {
  console.log(err);
}


