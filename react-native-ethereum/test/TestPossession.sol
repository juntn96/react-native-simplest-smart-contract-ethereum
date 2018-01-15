pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Possession.sol";

contract TestPossession {
    Possession possession = Possession(DeployedAddresses.Possession());

    function testUserCanBuyCar() public {
        uint returnedId = possession.buy(8);
        uint expected = 8;
        Assert.equal(returnedId, expected, "Owner of car ID 8 should be recorded.");
    }

    function testGetBuyerAddressByCarId() public {
        address expected = this;
        address buyer = possession.buyers(8);
        Assert.equal(buyer, expected, "Owner of car ID 8 should be recorded.");
    }

    function testGetBuyerAddressByCarIdInArray() public {
        address expected = this;
        address[10] memory buyes = possession.getBuyers();
        Assert.equal(buyes[8], expected, "Owner of car ID 8 should be recorded.");
    }
}