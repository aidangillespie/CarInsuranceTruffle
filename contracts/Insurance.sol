pragma solidity ^0.4.17;

contract Insurance {
    address[16] public insurers;

// Insuring a car 
function insure (uint  carId) public returns (uint) {
require(carId >= 0 && carId <= 15);
insurers[carId] = msg.sender;
return carId;
}
// Retrieving the insurers
function getInsurers() public view returns (address[16]) {
return insurers;
}
}


