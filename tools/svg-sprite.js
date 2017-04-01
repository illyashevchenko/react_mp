/* eslint-env node */

const SVGSpriter = require('svg-sprite');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

const config = {
  dest: 'src/components/assets',
  mode: {
    symbol: true,
  },
};
const destFolder = path.resolve(config.dest);
const destFile = path.join(destFolder, 'icons.svg');

const resolve = path.resolve.bind(path, __dirname);
const testFolder = resolve('./sprites/');
const joinFolder = path.join.bind(path, testFolder);

const test = RegExp.prototype.test.bind(/\.svg$/);
const spriter = new SVGSpriter(config);

const add = (name) => {
  const path = joinFolder(name);
  const contents = fs.readFileSync(path, { encoding: 'utf-8' });

  spriter.add(path, null, contents);
};

const compile = () => {
  spriter.compile(function (error, result) {
    const file = result.symbol.sprite;

    mkdirp.sync(destFolder);
    fs.writeFileSync(destFile, file.contents);
  });
};

fs.readdir(testFolder, (err, files) => {
  if (err) {
    throw Error(`Can't load sprite files. ${ err }`);
  }

  files.filter(test)
    .forEach(add);

  compile();
});