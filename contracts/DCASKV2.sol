// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./DCASK.sol";

/// @custom:security-contact engineering@digicask.finance
contract DCASKV2 is DCASK {
    function version() external pure returns (string memory) {
        return "v2";
    }
}
