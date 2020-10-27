import deepmerge from 'deepmerge';
import scaffoldTesting from './testing-scaffolder';
import scaffoldGatsbty from './gatsby-scaffolder';

export default async function ({projectRoot}) {
  const [testingResults, gatsbyResults] = await Promise.all([
    scaffoldTesting({projectRoot}),
    scaffoldGatsbty({projectRoot})
  ]);

  return deepmerge(testingResults, gatsbyResults);
}
