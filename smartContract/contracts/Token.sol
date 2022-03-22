// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Token{
    string public token_name = "My Token";
    string public token_symbol = "MT";
    uint public total_supply= 10000;

    mapping(address => uint) public balances;
    address public owner;

    constructor(){
        owner = msg.sender;
        balances[owner] = total_supply;
    }

    function transfer(address _to, uint _amount) external{
        console.log("***sender balance %s tokens***", balances[msg.sender]);
        console.log("***Sender is sending %s to %s address***", _amount, _to);

        require(balances[msg.sender] > _amount, "Not Enough Balances.");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount; 
    }

    function showBalance(address _ac) external view returns(uint){
        return balances[_ac];
    }
}