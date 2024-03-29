import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('smoke tests are wired up', async function () {
  const {devDependencies, eslint, scripts} = this.results;

  assert.includeMembers(devDependencies, ['cypress', 'start-server-and-test', 'is-website-vulnerable']);
  assert.deepInclude(eslint.configs, {files: 'test/smoke/**/*-spec.js', name: 'cypress'});
  assert.include(
    scripts,
    {
      'cypress:run': 'cypress run',
      'cypress:open': 'cypress open',
      'test:served':
        "start-server-and-test 'npm start' http://localhost:8000 'npm-run-all --print-label --parallel test:served:*'",
      'test:served:smoke': 'run-s cypress:run',
      'test:served:vulnerable': 'is-website-vulnerable http://localhost:8000'
    }
  );
  assert.deepEqual(
    JSON.parse(await fs.readFile(`${process.cwd()}/cypress.json`)),
    {
      integrationFolder: 'test/smoke/',
      baseUrl: 'http://localhost:8000'
    }
  );
});
