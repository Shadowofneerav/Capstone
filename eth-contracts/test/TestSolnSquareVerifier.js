// Test if a new solution can be added for contract - SolnSquareVerifier
var SolnSquareVerifier=artifacts.require('SolnSquareVerifier');
var SquareVerifier = artifacts.require('SquareVerifier');
var zokratesProof = require("../../zokrates/code/square/proof.json"); 
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
contract("SolnSquareVerifier", accounts =>{

    const owner=accounts[0];

    describe('Minting with zksnarks',function(){
        beforeEach(async function(){
            let squareVerifier=await SquareVerifier.new({from:accounts[0]});

            this.contract=await SolnSquareVerifier.new(squareVerifier.address);

        });
        
        it('minting token using zokrates',async function(){
            var value=await this.contract.mintToken(accounts[1],1,zokratesProof.proof, zokratesProof.inputs, { from: accounts[0] });
            console.log(value);
            assert.equal(value,true,"Unable to mint");
        })
    });

})