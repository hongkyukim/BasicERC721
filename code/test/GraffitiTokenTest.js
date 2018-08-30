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
});
