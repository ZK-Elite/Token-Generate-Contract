// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import {IAlienbaseTokenFactory} from "../interfaces/IAlienbaseTokenFactory.sol";
import "../interfaces/IUniswapV2Router02.sol";
import "./TaxableERC20.sol";

contract TaxTokenFactory is IAlienbaseTokenFactory {

    IUniswapV2Router02 router;
    address generator;

    constructor(address _generator, IUniswapV2Router02 _router) {
        router = _router;
        generator = _generator;
    }

    function deploy(address creator, DeploymentParams calldata params, bytes calldata additionalData) external override {
        require(msg.sender == generator, "Unauthorized");

        address developmentWallet = additionalData.length > 0 ? abi.decode(additionalData, (address)) : address(0);
        
        TaxableERC20 token = new TaxableERC20(
            creator,
            params.name,
            params.ticker,
            params.initialSupply,
            router,
            params.buyTax,
            params.sellTax,
            params.liquidityShare,
            developmentWallet    
        );
        emit TokenDeployed(address(token), creator);
    }
}
