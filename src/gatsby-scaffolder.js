import {promises as fs} from 'fs';
import {resolve} from 'path';
import mkdir from '../thirdparty-wrappers/make-dir';

export default async function ({projectRoot}) {
  const pathToPagesDirectory = await mkdir(`${projectRoot}/src/pages`);
  await Promise.all([
    fs.copyFile(resolve(__dirname, '..', 'templates', 'gatsby-config.js'), `${projectRoot}/gatsby-config.js`),
    fs.copyFile(resolve(__dirname, '..', 'templates', 'index.js'), `${pathToPagesDirectory}/index.js`)
  ]);

  return {
    dependencies: ['gatsby', 'react', 'react-dom'],
    eslint: {configs: ['react']},
    buildDirectory: 'public',
    vcsIgnore: {directories: ['.cache']},
    scripts: {
      clean: 'gatsby clean',
      start: 'run-s dev',
      dev: 'gatsby develop',
      serve: 'gatsby serve',
      build: 'gatsby build'
    },
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
  };
}
