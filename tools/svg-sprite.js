/* eslint-env node */

const SVGSpriter = require('svg-sprite');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

const config = {
  dest: 'src/components/layouts',
  mode: {
    symbol: true,
  },
};
const destFile = `${ config.dest }/icons.svg`;

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

    mkdirp.sync(path.dirname(file.path));
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