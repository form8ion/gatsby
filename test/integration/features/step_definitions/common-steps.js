import {resolve} from 'path';
import {promises as fs} from 'fs';
import {After, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';

const packagePreviewDirectory = '../__package_previews__/gatsby';
const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '../../../../', 'node_modules'));

After(function () {
  stubbedFs.restore();
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const mdxDeck = require('@form8ion/gatsby');
  const {scaffold} = mdxDeck;

  stubbedFs({
    node_modules: stubbedNodeModules,
    [packagePreviewDirectory]: {
      '@form8ion': {
        gatsby: {
          templates: {
            'gatsby-config.js': await fs.readFile(resolve(__dirname, '../../../../', 'templates/gatsby-config.js')),
            'index.js': await fs.readFile(resolve(__dirname, '../../../../', 'templates/index.js'))
          },
          node_modules: {
            '.pnpm': {
              '@form8ion+cypress-scaffolder@2.2.0': {
                node_modules: {
                  '@form8ion': {
                    'cypress-scaffolder': {
                      templates: {
                        'canary-spec.js': await fs.readFile(resolve(
                          __dirname,
                          '../../../../',
                          'node_modules/@form8ion/cypress-scaffolder/templates/canary-spec.js'
                        ))
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  this.results = await scaffold({projectRoot: process.cwd()});
});
