// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PermitUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./interface/IBlast.sol";
import "./interface/IBlastPoints.sol";

/// @custom:security-contact engineering@digicask.finance
contract DCASK is
    Initializable,
    ERC20Upgradeable,
    ERC20PermitUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    IBlast public constant BLAST =
        IBlast(0x4300000000000000000000000000000000000002);

    function initialize(address initialOwner) public initializer {
        __ERC20_init("DigiCask", "DCASK");
        __ERC20Permit_init("DCASK");
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();

        _mint(initialOwner, 1_000_000_000 * 10 ** decimals());

        // configure BLAST yield
        BLAST.configureClaimableGas();
        BLAST.configureGovernor(initialOwner);
        IBlastPoints(0x2536FE9ab3F511540F2f9e2eC2A805005C3Dd800)
            .configurePointsOperator(initialOwner);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    // BLAST Natives functions

    // claim gas
    function claimAllGas() external onlyOwner returns (uint256) {
        return BLAST.claimAllGas(address(this), owner());
    }

    function claimMaxGas() external onlyOwner returns (uint256) {
        return BLAST.claimMaxGas(address(this), owner());
    }

    // read functions
    function readClaimableYield() external view returns (uint256) {
        return BLAST.readClaimableYield(address(this));
    }

    function readYieldConfiguration() external view returns (uint8) {
        return BLAST.readYieldConfiguration(address(this));
    }
}
