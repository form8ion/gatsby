import {promises as fs} from 'fs';
import {resolve} from 'path';

import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';

import * as mkdir from '../thirdparty-wrappers/make-dir.js';
import scaffold from './gatsby-scaffolder.js';

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
        buildDirectory: 'public',
        dependencies: ['gatsby', 'react', 'react-dom'],
        eslint: {configs: ['react']},
        scripts: {
          clean: 'gatsby clean',
          start: 'run-s dev',
          dev: 'gatsby develop',
          serve: 'gatsby serve',
          build: 'gatsby build'
        },
        vcsIgnore: {directories: ['.cache']},
        nextSteps: [
          {
            summary: 'remove the babel preset and related dependencies',
            description: 'since it is preferred to use the one that is bundled with gatsby'
          },
          {
            summary: 'disable the peer dependency check',
            description: 'since the gatsby dependencies are a wild west'
          }
        ]
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
