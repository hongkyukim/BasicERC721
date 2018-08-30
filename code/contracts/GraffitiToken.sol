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

  // dynamic array
  Gradient[] gradients;

  function mint(string _outer, string _inner) public onlyOwner {
    Gradient memory _gradient = Gradient({outer: _outer, inner: _inner });
    uint _gradientId = gradients.push(_gradient) - 1;

    // This comes from ERC721 Token
    _mint(msg.sender, _gradientId);
  }

  function getGradient(uint _gradientId) public view returns(string outer, string inner) {
    Gradient memory _grad = gradients[_gradientId];
    outer = _grad.outer;
    inner = _grad.inner;
  }
}
