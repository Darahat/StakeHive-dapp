import { ethers } from 'ethers';
// StakeHiveFarm deployed to 
export const STAKE_HIVE_ADDRESS = '0x5d2a70eBDa668D72a96D181845a34387E54e16b9';
// HiveToken Deployed to
export const HIVE_TOKEN_ADDRESS = '0x9CF7441b32C4b6d8b79A6dC73f0bBC3088250519';

export const STAKE_HIVE_ABI = [
    // Only relevant functions for frontend
    'function stake(uint256 _amount) external',
    'function withdraw(uint256 _amount) external',
    'function claimRewards() external',
    'function getPendingRewards() external',
    'function stakers(address user) view returns (uint256 amount, uint256 rewardDebt, uint256 lastStakedTime)',
 ]

