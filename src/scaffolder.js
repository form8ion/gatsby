import deepmerge from 'deepmerge';

import scaffoldTesting from './testing-scaffolder.js';
import scaffoldGatsbty from './gatsby-scaffolder.js';

export default async function ({projectRoot}) {
  const [testingResults, gatsbyResults] = await Promise.all([
    scaffoldTesting({projectRoot}),
    scaffoldGatsbty({projectRoot})
  ]);

  return deepmerge(testingResults, gatsbyResults);
}
