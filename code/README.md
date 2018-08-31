# Intro

* This tutorial is an updated copy of Maksim Ivanon's [CryptoKitties Clone in 20 Minutes: Non-Fungible Token Tutorial](https://maksimivanov.com/posts/gradient-coin-tutorial/)

## After this:
* Read the source documents [github erc721](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md) and a [deeper walkthrough of erc721](https://medium.com/blockchannel/walking-through-the-erc721-full-implementation-72ad72735f3c)
* [CryptoZombies](https://cryptozombies.io) is a great walk through and will get solidity into your muscle memory
* Deeper discussion on ERC721 security and ERC165 [ERC721](https://medium.com/coinmonks/jumping-into-solidity-the-erc721-standard-part-3-5f38e012248b)

# npm 

Use npm to install:

* truffle - used for testing
* OpenZeppelin - library for writing secure Smart Contracts on Ethereum. [https://github.com/protofire/zeppelin-solidity](https://github.com/protofire/zeppelin-solidity)

# `basic truffle setup`

`mkdir GraffitiTokenTutorial`

`cd GraffitiTokenTutorial`

`truffle init`

This will set up your directory

# `0_empty_truffle`

Check out branch `0_empty_truffle`

This sets up your truffle directory. 


This adds the set up for the development network in truffle:

```
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
```

## Creating the token

`npm add zeppelin-solidity`
`touch contracts/GraffitiToken.sol`


Inside `GraffitiToken.sol`


```
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
```

So as I'm learning, I'm seeing that I can mix and match these standards. People are also busy extending contracts.

* __ERC721__ official documentation - [github erc721](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md)
* __Ownable__ - Ownable is a smart contract pattern that defines the concept of an owner for the smart contract and modifier called `onlyOwner` for the purposes of authorization control. [openzeppelin-solidity version](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol)


# `02_building_Token`

[Running migrations on truffle](https://truffleframework.com/docs/truffle/getting-started/running-migrations)

> These are javascript files that help deploy contracts to the Ethereum network. They stage deployment tasks.

Create a file `migrations/1_initial_migration.js`

```
var GraffitiToken = artifacts.require("GraffitiToken");

module exports = function(deployer) {
  deployer.deploy(GraffitiToken);
};
```


# `03_ganache_testing`

!!! Testing is a pretty big deal in blockchain, probably more so than in normal programming. Once you deploy to the network there is no undo button. !!!

Now we are going to run our local ethereum network

`ganache-cli -p 7545`


These are the test accounts, and they're preloaded with ether so you can test for gas cost.

```
Ganache CLI v6.0.3 (ganache-core: 2.0.2)

Available Accounts
==================
(0) 0x1a0d3048ea4016b5ef9c85ebcfc0968122e6bb52
(1) 0x2daa718a614c4f0df68a40c390d55e31cd3b47e3
(2) 0x9e92750dc85e3d68f517fe92e9df5460fed7abdb
(3) 0xfe2957cf55edfe98ae72fa64fe85e48da502f9e0
(4) 0x624b500487c023a9f4b40e0574b7e59098328db4
(5) 0x61e1aacee6edbfe571387cdc8a2cf5e7a82a0ec9
(6) 0xafc4e8c7c4b351c49a8bd2464e3009cd777fa3ce
(7) 0x562547cfc1b6059a318f093cf34c907261872051
(8) 0x4673c4f77caca91d5cd6d962a3750968309107c4
(9) 0xab82a2814368e31823c50568b2e20b30dea96848

Private Keys
==================
(0) 8bd7d2c8049d968ae69a392d049e79d0d2c06de2cb5372654db226fc0d38d88f
(1) 9de3e7c823dd3610e3348e2f786e38d9d7b0da9b6cee380b7cd9f4e266484eb1
(2) 13e5276b9368204beb014bbf871d2768df6e3e62b1b34d42e5529a2095120eed
(3) 427e61fbdffa11a78e6c12c75f0865adb6976876f9c4c8e4d91bdeb430f3da86
(4) 8d59538478f93892f27c0362ba8e78f3928bd3b2f314b07672674d81ac93ad24
(5) 9cc4d23ebfefda7eec78794bfd7888349a2a7b78aee520ae65b9b9fdd5879da8
(6) 142d088ce3e8fba649d8bbc0b7a2a08b4b3bb4e41fd51d2c2b0717fb1eae24af
(7) 4b801d4ce054dd2bb7980721dde953d45341d56d15f8c6501afae9ecefd98c13
(8) bdfed3631691cb26469275c933a335e68ee5249de301cbf8b489d9a6bac66e63
(9) 10d3b5aa01a5dcf37720259aa056d87552ccb2b5774e3962783b91e8c4e8b28d

HD Wallet
==================
Mnemonic:      canyon moment traffic post point tell nuclear seminar live satisfy bottom puppy
Base HD Path:  m/44'/60'/0'/0/{account_index}

Listening on localhost:7545
```

Truffle extends the Mocha testing framework with `contract()` and Chai for assertion

* Ensures clean contract state
* Provides list of accounts to use in the tests

# `04_basic_test_setup`



Test a method

```
  describe("mint", () => {
    it("Creates a token with specific outer and inner colors", async() => {
      let instance = await GraffitiToken.deployed();
      let owner = await instance.owner();

      let token = await instance.mint("#ff00dd", "#ddddff");

      let graffitiToken = await instance.tokenOfOwnerByIndex(owner, 0);
      let gradients = await instance.getGradient(graffitiToken);
      assert.deepEqual(gradients, ["#ff00dd", "#ddddff"]);
    });
  });
```



