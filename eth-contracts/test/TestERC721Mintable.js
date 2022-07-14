//var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');
var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    //console.log(account_one);
    //console.log(account_two);

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            //const ERC721MintableComplete1 = await ERC721MintableComplete.deployed();
            this.contract = await ERC721MintableComplete.new({from: account_one});
           
            var uri=this.contract.getBaseTokenURI()
            
            // TODO: mint multiple tokens
            await this.contract.mint(account_one,1,uri,{from:account_one});
            await this.contract.mint(accounts[2],2,uri,{from:account_one});
            
        })

        it('should return total supply', async function () { 
            //const ERC721MintableComplete1 = await ERC721MintableComplete.deployed();
            
            var supply= await this.contract.totalSupply();
            
            assert.equal(supply,2,'Invalid number of tokens');
        })

        it('should get token balance', async function () { 
            //const ERC721MintableComplete1 = await ERC721MintableComplete.deployed();
            var number_of_token=await this.contract.balanceOf.call(accounts[0]);
            assert.equal(number_of_token,1,"Correct");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
           // const ERC721MintableComplete1 = await ERC721MintableComplete.deployed();
            var tokenurl=await this.contract.tokenURI.call(1);
            assert.equal(tokenurl,'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1');
        })

        it('should transfer token from one owner to another', async function () { 
           // const ERC721MintableComplete1 = await ERC721MintableComplete.deployed();
            await this.contract.transferFrom(account_one,accounts[3],1,{from:account_one});
            
            var owner=await this.contract.ownerOf.call(1);
            assert.equal(owner,accounts[3],"Not equal bro");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
           // const ERC721MintableComplete1 = await ERC721MintableComplete.deployed();
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            //const ERC721MintableComplete1 = await .deployed();
            await this.contract.mint(account_two,5,{from:account_one});
        })

        it('should return contract owner', async function () { 
            //var owner=ERC721MintableComplete.
        })

    });
})