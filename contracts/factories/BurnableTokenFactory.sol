// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.2;

import {IAlienbaseTokenFactory} from "../interfaces/IAlienbaseTokenFactory.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract BurnableTokenFactory is IAlienbaseTokenFactory {

    address generator;

    constructor(address _generator) {
        generator = _generator;
    }

    function deploy(address creator, DeploymentParams calldata params, bytes calldata additionalData) external override {

        require(msg.sender == generator, "Unauthorized");
        
        BurnableERC20 token = new BurnableERC20(params.name, params.ticker, params.initialSupply, creator);
        emit TokenDeployed(address(token), creator);

    }


}

contract BurnableERC20 is ERC20, ERC20Permit, ERC20Burnable, Ownable {

    constructor(
        string memory name,
        string memory symbol,
        uint initialSupply,
        address creator
    ) Ownable(msg.sender) ERC20(name, symbol) ERC20Permit(name) {
        _mint(creator, initialSupply);
    }

}