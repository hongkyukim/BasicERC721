const GraffitiToken = artifacts.require("GraffitiToken");

contract("Graffiti Token", accounts => {
  it("Should make first account an owner", async () => {
    let instance = await GraffitiToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  it("total supply should be zero at the beginning", async () => {
    const instance = await GraffitiToken.deployed();
    const totalSupply = await instance.totalSupply();
    assert.equal(totalSupply, 0);
  });

  it("total should be 1 after minting a token", async () => {
    const instance = await GraffitiToken.deployed();
    let token = await instance.mint("#ff00dd", "#ddddff");

    const totalSupply = await instance.totalSupply();
    assert.equal(totalSupply, 1);
  });
});

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
