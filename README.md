-contract deploy
npx hardhat run scripts/deploy.js --network [network]

-contract verify
npx hardhat verify --contract contracts/MyBirdTestToken.sol:MyBirdTestToken --network sepolia 0xE8c59b24729975033A656a17411b6F80805Fc6Da "mybirdtest" "OCEXB" 18 

-deployed address
0xbbeea634C484ed0a19bD32d87cDac4E674bB047f

-run bot
npm start

-
.env
PRIVATE_KEY="7ece11dcf8c17e89e1d5bc29a79e8a1fd8adb5db2f4b25bb4abb982db6ae609e"
INFURA_API_KEY="10b5ec62d9754021aec25a026cd14d15"


npx hardhat verify --contract contracts/TokenGenerator.sol:TokenGenerator --network sepolia 0xbbeea634C484ed0a19bD32d87cDac4E674bB047f