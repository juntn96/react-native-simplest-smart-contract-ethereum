pragma solidity ^0.4.2;

contract Possession {
    address[10] public buyers;

    function buy(uint posId) public returns (uint) {
        require(posId > 0 && posId < 10);
        buyers[posId] = msg.sender;
        return posId;
    }

    function getBuyers() public view returns (address[10]) {
        return buyers;
    }
}