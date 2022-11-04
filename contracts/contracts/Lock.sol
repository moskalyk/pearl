// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Pearl is ChainlinkClient {

    uint public unlockTime;
    address payable public owner;

    /// @dev The WorldID instance that will be used for managing groups and verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The World ID group whose participants can claim this airdrop
    uint256 internal immutable groupId;

    /// @notice The ERC20 token airdropped to participants
    ERC20 public immutable token;

    /// @notice The address that holds the tokens that are being airdropped
    /// @dev Make sure the holder has approved spending for this contract!
    address public immutable holder;

    /// @notice The address that manages this airdrop, which is allowed to update the `airdropAmount`.
    address public immutable Oracle = msg.sender;

    /// @notice The amount of tokens that participants will receive upon claiming
    uint256 public airdropAmount;

    uint public deposits;

    event Withdrawal(uint amount, uint when);
    event Vurge(adress oracle, string silhouette, uint resistance, uint pearl, uint reed, address user);

    // Maybe make upgradeable
    constructor(
        uint _unlockTime, 
        string jobId_,
        // IWorldID _worldId,
        // uint256 _groupId,
        // ERC20 _token,
        // address _holder,
        // uint256 _airdropAmount
        ) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);

        // worldId = _worldId;
        // groupId = _groupId;
        // token = _token;
        // holder = _holder;
        // airdropAmount = _airdropAmount;

    }

    function greetings() public pure returns(string memory) {
        return "9728";
    }

    /*
        /// @notice     pay             for a pearl
        /// @param      silhouette      the aura from blueberry
        /// @param      pearl           the discrete pearl embedding
        /// @param      reed            the reed variant
        /// @param      receiver        The address that will receive the tokens
        /// @param      root            The of the Merkle tree
        /// @param      nullifierHash   The nullifier for this proof, preventing double signaling
        /// @param      proof           The zero knowledge proof that demostrates the claimer has been onboarded to World ID
    */
    function payWithIris(string memory silhouette, uint pearl, uint reed) public payable returns (uint) {
        // if you build it into the mem pool, you can provide credit card rollers delegating transactions
        deposits += msg.value;

        emit Verge(Oracle, silhouette, msg.value, pearl, reed, msg.sender)

        // worldId.verifyProof(
        //     root,
        //     groupId,
        //     abi.encodePacked(receiver).hashToField(),
        //     nullifierHash,
        //     abi.encodePacked(address(this)).hashToField(),
        //     proof
        // );

        // SafeTransferLib.safeTransferFrom(token, holder, receiver, airdropAmount);

        // nullifierHashes[nullifierHash] = true;

        return msg.value * pearl
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
