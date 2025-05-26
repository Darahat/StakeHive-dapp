import { h as defineStore, a as useNuxtApp } from './server.mjs';
import { ethers } from 'ethers';

const STAKE_HIVE_ADDRESS = "0xdc9EF61C70Dd0fd144AF3cFBb2dc30e7b5A8A717";
const HIVE_TOKEN_ADDRESS = "0xBA6D102E57Bda979B68BC4c0c47980CeBeF9075b";
const STAKE_HIVE_ABI = [
  // Only relevant functions for frontend
  "function stake(uint256 _amount) external",
  "function withdraw(uint256 _amount) external",
  "function claimRewards() external",
  "function getPendingRewards(address user) view returns (uint256)",
  "function stakers(address user) view returns (uint256 amount, uint256 rewardDebt, uint256 lastStakedTime)"
];
const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)"
];
const useWalletStore = defineStore("wallet", {
  state: () => ({
    address: "",
    isConnected: false,
    provider: null,
    account: "",
    isConnected: false,
    chainId: null,
    netWorkName: "",
    totalBalance: "0",
    pendingRewards: "0",
    stakedAmount: "0",
    signer: null,
    tokenContracts: {
      // Add your token contracts here
      HIVE: {
        address: HIVE_TOKEN_ADDRESS,
        // Replace with actual contract address
        abi: ERC20_ABI
        // ERC-20 ABI
      }
    },
    stakeHiveContracts: {
      // Add your token contracts here
      STAKEHIVE: {
        address: STAKE_HIVE_ADDRESS,
        // Replace with actual contract address
        abi: STAKE_HIVE_ABI
        // ERC-20 ABI
      }
    }
  }),
  actions: {
    async connectWallet() {
      const { $web3Provider, $ethers } = useNuxtApp();
      try {
        const web3Provider = $web3Provider.provider;
        const getNetWorkInfo = await web3Provider.getNetwork();
        this.provider = web3Provider;
        this.chainId = getNetWorkInfo.chainId;
        this.netWorkName = getNetWorkInfo.name;
        const accounts = await (void 0).ethereum.request({ method: "eth_requestAccounts" });
        this.account = accounts[0];
        this.isConnected = this.account.length > 0;
        this.signer = $web3Provider.getSigner();
        if (!this.signer) {
          console.warn("Signer is not set.");
          return;
        }
        await this.loadStakingData();
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    },
    async getWalletBalance(web3Provider) {
      try {
        const balanceBigNumber = await web3Provider.getBalance(this.account);
        this.totalBalance = ethers.formatEther(balanceBigNumber);
        console.log("totalBalance", this.totalBalance);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
        this.balance = "0";
      }
    },
    async getTokenBalance(web3Provider) {
      try {
        const tokenInfo = this.tokenContracts.HIVE;
        const tokenContract = new ethers.Contract(tokenInfo.address, tokenInfo.abi, web3Provider);
        const rawBalance = await tokenContract.balanceOf(this.account);
        this.tokenBalance = ethers.formatEther(rawBalance);
      } catch (error) {
        console.error("Error fetching token balance:", error);
      }
    },
    async getStakingData(web3Provider) {
      try {
        const stakeHiveInfo = this.stakeHiveContracts.STAKEHIVE;
        const stakeHiveContract = new ethers.Contract(stakeHiveInfo.address, stakeHiveInfo.abi, web3Provider);
        const pendingRewards = await stakeHiveContract.getPendingRewards(this.account);
        this.pendingRewards = ethers.formatEther(pendingRewards);
        const stakerInfo = await stakeHiveContract.stakers(this.account);
        this.stakedAmount = ethers.formatEther(stakerInfo.amount);
        this.rewardDebt = ethers.formatEther(stakerInfo.rewardDebt);
        console.log("web3Provider", web3Provider);
        console.log("provider", this.provider);
        console.log("signer", this.signer);
      } catch (error) {
        console.error("Error fetching staking data:", error);
      }
    },
    async stake(amountinEther) {
      console.log("amountinEther-------------------", amountinEther);
      const { $web3Provider } = useNuxtApp();
      try {
        const signer = $web3Provider.getSigner();
        const stakeHiveInfo = this.stakeHiveContracts.STAKEHIVE;
        const web3Provider = $web3Provider.provider;
        const tokenInfo = this.tokenContracts.HIVE;
        const tokenContract = new ethers.Contract(tokenInfo.address, tokenInfo.abi, signer);
        const decimals = await tokenContract.decimals();
        const amount = ethers.parseUnits(amountinEther.toString(), 18);
        console.log("requested amountinEther:", amount);
        const approveTx = await tokenContract.approve(stakeHiveInfo.address, amount);
        await approveTx.wait();
        console.log("Token approved for staking:", approveTx);
        const stakeHiveContract = new ethers.Contract(stakeHiveInfo.address, stakeHiveInfo.abi, signer);
        const tx = await stakeHiveContract.stake(amount);
        await tx.wait();
        console.log("Staking transaction sent:", tx);
        await this.loadStakingData();
        return tx;
      } catch (error) {
        console.error("Error staking:", error);
      }
    },
    async claimRewards() {
      try {
        const stakeHiveInfo = this.stakeHiveContracts.STAKEHIVE;
        const { $web3Provider } = useNuxtApp();
        const signer = $web3Provider.getSigner();
        const web3Provider = $web3Provider.provider;
        const stakeHiveContract = new ethers.Contract(stakeHiveInfo.address, stakeHiveInfo.abi, signer);
        const tx = await stakeHiveContract.claimRewards();
        console.log("Claiming tx sent:", tx.hash);
        await tx.wait();
        console.log("ClaimRewards tx confiremed:", tx);
        await this.loadStakingData();
        return tx;
      } catch (error) {
        console.error("Error claiming rewards:", error);
      }
    },
    async withdraw(amountinEther) {
      const { $web3Provider } = useNuxtApp();
      try {
        if (!amountinEther || Number(amountinEther) <= 0) {
          throw new Error("Invalid withdrawal amount");
        }
        const signer = await $web3Provider.getSigner();
        const stakeHiveInfo = this.stakeHiveContracts.STAKEHIVE;
        const stakeHiveContract = new ethers.Contract(stakeHiveInfo.address, stakeHiveInfo.abi, signer);
        const amount = ethers.parseUnits(amountinEther.toString(), 18);
        const stakedInfo = await stakeHiveContract.stakers(this.account);
        if (stakedInfo.amount < amount) {
          throw new Error("Insufficient staked amount for withdrawal");
        }
        const tx = await stakeHiveContract.withdraw(amount);
        console.log("Withdraw tx sent:", tx.hash);
        const receipt = await tx.wait();
        if (receipt.status !== 1) {
          throw new Error("Transaction failed on-chain");
        }
        await this.loadStakingData();
        return {
          hash: receipt.transactionHash,
          receipt,
          error: null
        };
      } catch (error) {
      }
    },
    async loadStakingData() {
      const { $web3Provider } = useNuxtApp();
      const web3Provider = $web3Provider.provider;
      await this.getWalletBalance(web3Provider);
      await this.getTokenBalance(web3Provider);
      await this.getStakingData(web3Provider);
    }
  }
});

export { useWalletStore as u };
//# sourceMappingURL=walletStore-KsZt8rDQ.mjs.map
