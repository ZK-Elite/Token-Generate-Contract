async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // const BurnableTokenFactory = await ethers.getContractFactory("BurnableTokenFactory");
  // const burnableTokenFactory = await BurnableTokenFactory.deploy(deployer.address);
  // await burnableTokenFactory.deployed();
  // console.log("BurnableTokenFactory deployed to:", burnableTokenFactory.address);

  // const MintableTokenFactory = await ethers.getContractFactory("MintableTokenFactory");
  // const mintableTokenFactory = await MintableTokenFactory.deploy(deployer.address);
  // await mintableTokenFactory.deployed();
  // console.log("MintableTokenFactory deployed to:", mintableTokenFactory.address);

  // const MintBurnTokenFactory = await ethers.getContractFactory("MintBurnTokenFactory");
  // const mintBurnTokenFactory = await MintBurnTokenFactory.deploy(deployer.address);
  // await mintBurnTokenFactory.deployed();
  // console.log("MintBurnTokenFactory deployed to:", mintBurnTokenFactory.address);

  // const SimpleTokenFactory = await ethers.getContractFactory("SimpleTokenFactory");
  // const simpleTokenFactory = await SimpleTokenFactory.deploy(deployer.address);
  // await simpleTokenFactory.deployed();
  // console.log("SimpleTokenFactory deployed to:", simpleTokenFactory.address);

  // const TaxTokenFactory = await ethers.getContractFactory("TaxTokenFactory");
  // const taxTokenFactory = await TaxTokenFactory.deploy(deployer.address, process.env.IUNISWAPV2FACTORYADDRESS);
  // await taxTokenFactory.deployed();
  // console.log("TaxTokenFactory deployed to:", taxTokenFactory.address);

  const TokenGenerator = await ethers.getContractFactory("TokenGenerator");
  const tokenGenerator = await TokenGenerator.deploy();
  await tokenGenerator.deployed();
  console.log("TokenGenerator deployed to:", tokenGenerator.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });