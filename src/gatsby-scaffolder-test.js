import {promises as fs} from 'fs';
import {resolve} from 'path';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as mkdir from '../thirdparty-wrappers/make-dir';
import scaffold from './gatsby-scaffolder';

suite('gatsby scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'copyFile');
    sandbox.stub(mkdir, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the site is scaffolded', async () => {
    const projectRoot = any.string();
    const pathToPagesDirectory = any.string();
    mkdir.default.withArgs(`${projectRoot}/src/pages`).resolves(pathToPagesDirectory);

    const results = await scaffold({projectRoot});

    assert.deepEqual(
      results,
      {
        dependencies: ['gatsby', 'react', 'react-dom'],
        scripts: {
          clean: 'gatsby clean',
          start: 'run-s develop',
          dev: 'gatsby develop',
          serve: 'gatsby serve',
          build: 'gatsby build'
        }
      }
    );
    assert.calledWith(
      fs.copyFile,
      resolve(__dirname, '..', 'templates', 'gatsby-config.js'),
      `${projectRoot}/gatsby-config.js`
    );
    assert.calledWith(
      fs.copyFile,
      resolve(__dirname, '..', 'templates', 'index.js'),
      `${pathToPagesDirectory}/index.js`
    );
  });
});
