const { constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const { expect } = require('chai');

const Ownable = artifacts.require('OwnableMock');

contract('Ownable', function (accounts) {
  const [ owner, other ] = accounts;

  beforeEach(async function () {
    this.ownable = await Ownable.new({ from: owner });
  });

  it('has an owner', async function () {
    expect(await this.ownable.owner()).to.equal(owner);
  });

  describe('transfer ownership', function () {
    it('changes owner after transfer', async function () {
      const receipt = await this.ownable.transferOwnership(other, { from: owner });
      expectEvent(receipt, 'OwnershipTransferred');

      expect(await this.ownable.owner()).to.equal(other);
    });

    // FIXME: In https://zilliqa-jira.atlassian.net/browse/ZIL-4899
    xit('prevents non-owners from transferring', async function () {
      await expect(this.ownable.transferOwnership(other, { from: other }))
        .to.be.revertedWith('Ownable: caller is not the owner');
    });

    // FIXME: In https://zilliqa-jira.atlassian.net/browse/ZIL-4899
    xit('guards ownership against stuck state', async function () {
      await expectRevert(
        this.ownable.transferOwnership(ZERO_ADDRESS, { from: owner }),
        'Ownable: new owner is the zero address',
      );
    });
  });

  describe('renounce ownership', function () {
    it('loses owner after renouncement', async function () {
      const receipt = await this.ownable.renounceOwnership({ from: owner });
      expectEvent(receipt, 'OwnershipTransferred');

      expect(await this.ownable.owner()).to.equal(ZERO_ADDRESS);
    });

    // FIXME: In https://zilliqa-jira.atlassian.net/browse/ZIL-4899
    xit('prevents non-owners from renouncement', async function () {
      await expectRevert(
        this.ownable.renounceOwnership({ from: other }),
        'Ownable: caller is not the owner',
      );
    });
  });
});
