pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

// The Token class name / symbol need not be unique
// the contract address when deployed is the true identifier -
// so we could theoretically create an identifical CryptoKitty KittyBase
contract GraffitiToken is ERC721Token("GraffitiToken", "GRAFF"), Ownable {
  struct Gradient {
    string outer;
    string inner;
  }
}
