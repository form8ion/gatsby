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
    scripts: {
      clean: 'gatsby clean',
      start: 'run-s develop',
      dev: 'gatsby develop',
      serve: 'gatsby serve',
      build: 'gatsby build'
    }
  };
}
