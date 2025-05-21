// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract HiveToken is ERC20, Ownable, ERC20Burnable, ERC20Permit {
    constructor(
        uint256 initialSupply
    )
        ERC20("HiveToken", "HIVE") // <- ERC20 name and symbol
        Ownable(msg.sender)
        ERC20Permit("HiveToken") // <- Permit name
    {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
