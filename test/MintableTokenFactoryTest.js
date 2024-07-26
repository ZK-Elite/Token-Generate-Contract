const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MintableTokenFactory", function () {
  let MintableTokenFactory, mintableTokenFactory, MintableERC20, mintableERC20, owner, addr1;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    
    // Deploy MintableTokenFactory
    const MintableTokenFactory = await ethers.getContractFactory("MintableTokenFactory");
    mintableTokenFactory = await MintableTokenFactory.deploy(owner.address);
    await mintableTokenFactory.deployed();

    // Get the ABI and bytecode of MintableERC20
    const MintableERC20 = await ethers.getContractFactory("MintableERC20");

    // Deploy a MintableERC20 token using the factory
    const tx = await mintableTokenFactory.deploy(
      owner.address, 
      {
        factoryIndex: 1,
        mintable: true,
        burnable: false,
        name: "MyToken",
        ticker: "MTK",
        initialSupply: ethers.utils.parseUnits("1000", 18),
        maxSupply: ethers.utils.parseUnits("1000000", 18),
        taxToken: false,
        sellTax: 0,
        buyTax: 0,
        liquidityShare: 0,
        teamShare: 0,
      },
      "0x"
    );

    const receipt = await tx.wait();
    const event = receipt.events.find(event => event.event === 'TokenDeployed');
    const [tokenAddress] = event.args;

    mintableERC20 = MintableERC20.attach(tokenAddress);
  });

  it("should deploy a token and set correct parameters", async function () {
    expect(await mintableERC20.name()).to.equal("MyToken");
    expect(await mintableERC20.symbol()).to.equal("MTK");
    expect(await mintableERC20.totalSupply()).to.equal(ethers.utils.parseUnits("1000", 18));
    expect(await mintableERC20.maxSupply()).to.equal(ethers.utils.parseUnits("1000000", 18));
    expect(await mintableERC20.owner()).to.equal(owner.address);
  });

  it("should allow the owner to mint tokens", async function () {
    await mintableERC20.mint(addr1.address, ethers.utils.parseUnits("500", 18));
    expect(await mintableERC20.balanceOf(addr1.address)).to.equal(ethers.utils.parseUnits("500", 18));
  });

  it("should not allow non-owners to mint tokens", async function () {
    await expect(mintableERC20.connect(addr1).mint(addr1.address, ethers.utils.parseUnits("500", 18))).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should not allow minting beyond the max supply", async function () {
    const remainingSupply = (await mintableERC20.maxSupply()).sub(await mintableERC20.totalSupply());
    await mintableERC20.mint(addr1.address, remainingSupply);

    await expect(mintableERC20.mint(addr1.address, ethers.utils.parseUnits("1", 18))).to.be.revertedWith("ERC20: cannot mint more tokens, cap exceeded");
  });
});
