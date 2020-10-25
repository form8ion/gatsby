import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the site is available', async function () {
  const {buildDirectory, dependencies, eslintConfigs, nextSteps, scripts} = this.results;

  assert.equal(buildDirectory, 'public');
  assert.includeMembers(dependencies, ['gatsby', 'react', 'react-dom']);
  assert.include(eslintConfigs, 'react');
  assert.include(
    scripts,
    {
      clean: 'gatsby clean',
      start: 'run-s dev',
      dev: 'gatsby develop',
      serve: 'gatsby serve',
      build: 'gatsby build'
    }
  );
  assert.equal(
    await fs.readFile(`${process.cwd()}/gatsby-config.js`, 'utf-8'),
    `/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: []
};
`
  );
  assert.equal(
    await fs.readFile(`${process.cwd()}/src/pages/index.js`, 'utf-8'),
    `import React from 'react';

export default function Home() {
  return <div>Hello world!</div>;
}
`
  );
  assert.includeDeepMembers(
    nextSteps,
    [
      {
        summary: 'remove the babel preset and related dependencies',
        description: 'since it is preferred to use the one that is bundled with gatsby'
      },
      {summary: 'disable the peer dependency check', description: 'since the gatsby dependencies are a wild west'}
    ]
  );
});
