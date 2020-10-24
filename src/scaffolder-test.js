import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as testingScaffolder from './testing-scaffolder';
import scaffold from './scaffolder';

suite('scaffolder', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(testingScaffolder, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the site is scaffolded', async () => {
    const projectRoot = any.string();
    const testingResults = any.simpleObject();
    testingScaffolder.default.withArgs({projectRoot}).resolves(testingResults);

    const results = await scaffold({projectRoot});

    assert.deepEqual(results, testingResults);
  });
});
