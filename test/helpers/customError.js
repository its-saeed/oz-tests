const { config } = require('hardhat');
const { expectRevert } = require('@openzeppelin/test-helpers');

const optimizationsEnabled = config.solidity.compilers.some(c => c.settings.optimizer.enabled);

/** Revert handler that supports custom errors. */
async function expectRevertCustomError (promise, reason) {
  // FIXME: In https://zilliqa-jira.atlassian.net/browse/ZIL-4899
  await expectRevert(promise, 'revert');
  return;

  try {
    await promise;
    expect.fail('Expected promise to throw but it didn\'t');
  } catch (revert) {
    if (reason) {
      if (optimizationsEnabled) {
        // Optimizations currently mess with Hardhat's decoding of custom errors
        expect(revert.message).to.include.oneOf([reason, 'unrecognized return data or custom error']);
      } else {
        expect(revert.message).to.include(reason);
      }
    }
  }
};

module.exports = {
  expectRevertCustomError,
};
