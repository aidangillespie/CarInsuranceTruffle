pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Insurance.sol";

contract TestInsurance {
  Insurance insurance = Insurance(DeployedAddresses.Insurance());

// Testing the insure() function
function testUserCanInsureDriver() public {
  uint returnedId = insurance.insure(8);

  uint expected = 8;

  Assert.equal(returnedId, expected, "Insurance of car ID 8 should be recorded.");

}

// Testing retrieval of a single pet's owner
function testGetInsurerAddressByCarId() public 
{
  // Expected owner is this contract
  address expected = this;
  address insurer = insurance.insurers(8);
  Assert.equal(insurer, expected, "Owner of pet ID 8 should be recorded.");
}
// Testing retrieval of all car insurers
function testGetInsurerAddressByCarIdInArray() public {
  // Expected owner is this contract
  address expected = this;

  // Store insurers in memory rather than contract's storage
  address[16] memory insurers = insurance.getInsurers();

  Assert.equal(insurers[8], expected, "Owner of regID 8 should be recorded.");
}
}


