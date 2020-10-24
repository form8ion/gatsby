import {promises as fs} from 'fs';
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
});
