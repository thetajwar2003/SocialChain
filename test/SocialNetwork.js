/* eslint-disable no-undef */
const { assert } = require('chai');
const _deploy_contracts = require('../migrations/2_deploy_contracts');

const SocialNetwork = artifacts.require('./SocialNetwork.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('SocialNetwork', ([deployer, author, tipper]) => {
    let socialNetwork;

    before(async () => {
        socialNetwork = await SocialNetwork.deployed();
    });

    describe('deployment', async () => {
        it('deploy successfully', async () => {
            const address = await socialNetwork.address;

            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it('has a name', async () => {
            const name = await socialNetwork.name();
            assert.equal(name, "My Social Network");
        });
    });

    describe('posts', async () => {
        let result, postCount;

        it('creates posts', async () => {
            result = await socialNetwork.createPost('This is my first post', { from: author });
            postCount = await socialNetwork.postCount();

            // SUCCESS
            assert.equal(postCount, 1);
            const event = result.logs[0].args;

            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct');
            assert.equal(event.content, 'This is my first post', "content is correct");
            assert.equal(event.tipAmount, '0', 'tip amount is correct');
            assert.equal(event.author, author, 'author is correct');

            // FAILURE: post must have content
            await socialNetwork.createPost('', { from: author }).should.be.rejected;
        });




        // it('lists posts', async () => {
        //     TODO:
        // });
        // it('allows users to tip posts', async () => {
        //     TODO:
        // });
    });
});
