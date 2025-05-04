// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FoodToken is ERC20 {
    // Constructor that initializes the ERC20 token with a name and symbol
    constructor() ERC20("FoodyToken", "FOODY") {
        // Mint initial supply of tokens to the contract deployer's address
        // _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Function to mint new tokens, restricted to the contract owner
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    // Custom function that uses _transfer internally
    function transfer(address to, uint256 amount) public override returns (bool) {
        _transfer(_msgSender(), to, amount);
        return true;
    }

    // Function to donate tokens from one address to another
    function donate(address from, address to, uint256 amount) public returns (bool) {
        require(balanceOf(from) >= amount, "Insufficient amount in donor's wallet");

        _transfer(from, to, amount);
        return true;
    }
}
