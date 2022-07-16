pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is CustomERC721Token{
    Verifier v;
// TODO define a solutions struct that can hold an index & an address
    constructor(address owner) public {
        v = Verifier(owner);
    }
struct solution
{
    uint256 id;
    address ad;
}

// TODO define an array of the above struct
mapping(bytes32=>solution) Solutions;

// TODO define a mapping to store unique solutions submitted
mapping(uint256=>bytes32) submittedsolution;


// TODO Create an event to emit when a solution is added
event SolutionAdded(uint256 index,address account);


// TODO Create a function to add the solutions to the array and emit the event
function addSolution(bytes32 token,uint256 _id,address _ad) public{
    Solutions[token].id=_id;
    Solutions[token].ad=_ad;
    emit SolutionAdded(_id,_ad);
}

//Hey
// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function mintToken(address account, uint256 index, Verifier.Proof memory proof, uint[2] memory input) public returns(bool) {
    
        require(v.verifyTx(proof,input),"Not a valid proof");
          bytes32 key = keccak256(abi.encodePacked(proof.a.X, proof.a.Y, proof.b.X, proof.b.Y, proof.c.X, proof.c.Y, input));

                require(Solutions[key].ad == address(0x0), "Solution already exists");

                addSolution(key, index, account);

                string memory baseTokenUri = super.getBaseTokenURI();

                return super.mint(account, index, baseTokenUri);

        
    }
}
  


























