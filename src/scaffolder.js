import deepmerge from 'deepmerge';
import scaffoldTesting from './testing-scaffolder';

export default async function ({projectRoot}) {
  const testingResults = await scaffoldTesting({projectRoot});

  return deepmerge(
    testingResults,
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
}
