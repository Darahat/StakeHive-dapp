import { defineStore } from 'pinia';
import { ethers } from 'ethers'; 
// import contract.js
import { STAKE_HIVE_ADDRESS, HIVE_TOKEN_ADDRESS, STAKE_HIVE_ABI, ERC20_ABI  } from '@/utils/contract.js';

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    address: '',
    isConnected: false,
    provider: null,
    account: '',
    isConnected: false,
    chainId: null,
    netWorkName: '',
    totalBalance: '0',
    pendingRewards: '0',
    stakedAmount: '0',
    signer: null,
    tokenContracts: {
      // Add your token contracts here
      HIVE: {
        address: HIVE_TOKEN_ADDRESS, // Replace with actual contract address
        abi: ERC20_ABI // ERC-20 ABI
      },
    },
    stakeHiveContracts: {
      // Add your token contracts here
      STAKEHIVE: {
        address: STAKE_HIVE_ADDRESS, // Replace with actual contract address
        abi: STAKE_HIVE_ABI // ERC-20 ABI
      },
    }
  }),
  actions: {
     
 
  
    async connectWallet() {
      const { $web3Provider, $ethers } = useNuxtApp();

      try {
        // this.provider = $web3Provider.provider;
        // const getNetWorkInfo = await this.provider.getNetwork();

        const web3Provider = $web3Provider.provider;
        const getNetWorkInfo = await web3Provider.getNetwork();
        this.provider = web3Provider;
        this.chainId = getNetWorkInfo.chainId; // Access raw value
        this.netWorkName = getNetWorkInfo.name; // Access raw value
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.account = accounts[0];
        this.isConnected = this.account.length > 0;
        this.signer =  $web3Provider.getSigner();
        // const { ethers } = $web3Provider;
        if (!this.signer) {
  console.warn("Signer is not set.");
  return;
}
        await this.getWalletBalance(web3Provider); // <-- Fetch balance after connecting
        await this.getTokenBalance(web3Provider);
        await this.getStakingData(web3Provider);

      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    },
    async getWalletBalance(web3Provider) {
      // const { $ethers } = useNuxtApp();
        //  console.log("provider", this.provider);
        // console.log("netWorkName", this.netWorkName);
        // console.log("chainId", this.chainId);
        // console.log("account", this.account);
      try {
        const balanceBigNumber = await web3Provider.getBalance(this.account);
        this.totalBalance = ethers.formatEther(balanceBigNumber);

        console.log("totalBalance", this.totalBalance);
        // this.balance = $ethers.formatEther(balanceBigNumber);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
        this.balance = '0'; // Fallback in case of error
      }
    },
    async getTokenBalance(web3Provider) {
      
       try {
         const tokenInfo = this.tokenContracts.HIVE;
         
        //create  contract instance
        //  const tokenContract = new ethers.Contract(tokenInfo.address, tokenInfo.abi, this.signer);
         const tokenContract = new ethers.Contract(tokenInfo.address, tokenInfo.abi, web3Provider);

         // get token balance
        // console.log("tokenContract", tokenContract);

        const rawBalance = await tokenContract.balanceOf(this.account);
         this.tokenBalance = ethers.formatEther(rawBalance);
        // console.log("rawBalance", this.tokenBalance);

         

         
         
         
      } catch (error) {
        console.error("Error fetching token balance:", error);
      }
    },
    async getStakingData(web3Provider) {
      try {
        const stakeHiveInfo = this.stakeHiveContracts.STAKEHIVE;
        const stakeHiveContract  = new ethers.Contract(stakeHiveInfo.address, stakeHiveInfo.abi, web3Provider);
        const pendingRewards = await stakeHiveContract.getPendingRewards(this.account);
        this.pendingRewards = ethers.formatEther(pendingRewards);

        //Get Staked Info (struct with amount, rewardDebt, lastStakedTime)
        const stakerInfo = await stakeHiveContract.stakers(this.account);
        this.stakedAmount = ethers.formatEther(stakerInfo.amount);
        this.rewardDebt = ethers.formatEther(stakerInfo.rewardDebt);
        console.log("web3Provider", web3Provider);
        console.log("provider", this.provider);
        console.log("signer", this.signer);
        // console.log("stakedAmount", this.stakedAmount);
        // console.log("rewardDebt", this.rewardDebt);
      }catch (error) {
        console.error("Error fetching staking data:", error);
      }
    },
    async stake(amountinEther) {
      console.log("amountinEther-------------------", amountinEther);
      const { $web3Provider } = useNuxtApp();
    

      // process.exit(0);
      try {
        const signer =  $web3Provider.getSigner(); // ✅ get the signer
        // const amount =  ethers.parseEther(`${amountinEther}`);
       
        const stakeHiveInfo = this.stakeHiveContracts.STAKEHIVE;


        //approve token
        const tokenInfo = this.tokenContracts.HIVE;
        //create  contract instance
        const tokenContract = new ethers.Contract(tokenInfo.address, tokenInfo.abi, signer);
        const decimals = await tokenContract.decimals();
        const amount = ethers.parseUnits(amountinEther.toString(), 18);
        console.log("requested amountinEther:", amount);
        const approveTx = await tokenContract.approve(stakeHiveInfo.address , amount);
        await approveTx.wait(); // Wait for approval transaction to be mined
        console.log("Token approved for staking:", approveTx);

        const stakeHiveContract  = new ethers.Contract(stakeHiveInfo.address, stakeHiveInfo.abi, signer);   
        const tx = await stakeHiveContract.stake(amount);
        await tx.wait();
        console.log("Staking transaction sent:", tx);
        
        // await tx.wait();
       } catch (error) {
        console.error("Error staking:", error);
      }
    }
  }
})