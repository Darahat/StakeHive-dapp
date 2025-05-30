import { ethers } from 'ethers';
// StakeHiveFarm deployed to 
export const STAKE_HIVE_ADDRESS = '0xdc9EF61C70Dd0fd144AF3cFBb2dc30e7b5A8A717';
// HiveToken Deployed to
export const HIVE_TOKEN_ADDRESS = '0xBA6D102E57Bda979B68BC4c0c47980CeBeF9075b';

export const STAKE_HIVE_ABI = [
    // Only relevant functions for frontend
    'function stake(uint256 _amount) external',
    'function withdraw(uint256 _amount) external',
    'function claimRewards() external',
    'function getPendingRewards(address user) view returns (uint256)',
    'function stakers(address user) view returns (uint256 amount, uint256 rewardDebt, uint256 lastStakedTime)',
    
  
  // Add these events
  'event Staked(address indexed user, uint256 amount)',
  'event Unstaked(address indexed user, uint256 amount)',
  'event RewardPaid(address indexed user, uint256 reward)'
]
// Minimal ERC-20 ABI for HIVE token
export const ERC20_ABI = [
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function queryFilter(address from, address to, uint256 amount) view returns (uint256[] memory)',
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function decimals() view returns (uint8)",
];
const HIVE_TOKEN_ABI = [ // Minimum ABI for transfer
  "function transfer(address to, uint amount) external returns (bool)",
  "function decimals() public view returns (uint8)"
];

