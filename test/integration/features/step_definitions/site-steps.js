import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the site is available', async function () {
  const {dependencies, scripts} = this.results;

  ['gatsby', 'react', 'react-dom'].forEach(dependency => assert.include(dependencies, dependency));
  assert.include(
    scripts,
    {
      clean: 'gatsby clean',
      start: 'run-s develop',
      dev: 'gatsby develop',
      serve: 'gatsby serve',
      build: 'gatsby build'
    }
  );
});
