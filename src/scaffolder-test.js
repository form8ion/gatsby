import deepmerge from 'deepmerge';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as testingScaffolder from './testing-scaffolder';
import * as gatsbyScaffolder from './gatsby-scaffolder';
import scaffold from './scaffolder';

suite('scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(testingScaffolder, 'default');
    sandbox.stub(gatsbyScaffolder, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the site is scaffolded', async () => {
    const projectRoot = any.string();
    const testingResults = any.simpleObject();
    const gatsbyResults = any.simpleObject();
    testingScaffolder.default.withArgs({projectRoot}).resolves(testingResults);
    gatsbyScaffolder.default.withArgs({projectRoot}).resolves(gatsbyResults);

    const results = await scaffold({projectRoot});

    assert.deepEqual(results, deepmerge(testingResults, gatsbyResults));
  });
});
