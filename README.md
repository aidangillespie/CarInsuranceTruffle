# CarInsuranceTruffle

This CarInsuranceTruffle  projects  is and adaptation of Pet Shop Tutorial where I  replace  cars  for  pets  Insurance for Adoption, insure for adopt  etc  I  am  running into a  problem  with  compiling although it migrtaes and tests  oK

If  soemone  can  point  mein the right  direction re Assert.sol and 
var nstr = _itoa(value, 10);
        ^------^

        var nstr = _utoa(value, 10);
        ^------^

        var nstr = _ltoa(value);
        ^------^
,
            TestEvent(true, "");
            ^-----------------^

            TestEvent(false, message);

These are the issues

Using network 'development'.

Compiling ./contracts/Insurance.sol...
Compiling ./test/TestInsurance.sol...
Compiling truffle/Assert.sol...
Compiling truffle/DeployedAddresses.sol...

Compilation warnings encountered:

truffle/Assert.sol:1563:9: Warning: Use of the "var" keyword is deprecated.
        var nstr = _itoa(value, 10);
        ^------^
,truffle/Assert.sol:1580:9: Warning: Use of the "var" keyword is deprecated.
        var nstr = _utoa(value, 10);
        ^------^
,truffle/Assert.sol:1597:9: Warning: Use of the "var" keyword is deprecated.
        var nstr = _ltoa(value);
        ^------^
,truffle/Assert.sol:1347:13: Warning: Invoking events without "emit" prefix is deprecated.
            TestEvent(true, "");
            ^-----------------^
,truffle/Assert.sol:1349:13: Warning: Invoking events without "emit" prefix is deprecated.
            TestEvent(false, message);
            ^-----------------------^



  TestInsurance
    ✓ testUserCanInsureDriver (604ms)
    ✓ testGetInsurerAddressByRegId (640ms)
    ✓ testGetInsurerAddressByCarIdInArray (1267ms)

