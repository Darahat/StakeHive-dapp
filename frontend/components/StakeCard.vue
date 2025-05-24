<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-3">Hive Staking Platform</h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Earn passive income by staking your HIVE tokens
      </p>
    </div>

    <!-- Main Dashboard -->
    <div class="max-w-6xl mx-auto">
      <!-- Stats Grid -->
      <div class="grid gap-8 mb-12 md:grid-cols-3">
        <!-- Wallet Balance Card -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
          <div class="p-8">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-100 p-4 rounded-xl">
                <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-6">
                <h3 class="text-lg font-medium text-gray-500">ETH Balance</h3>
                <p class="mt-2 text-3xl font-bold text-gray-900">
                  {{ formattedWalletBalance }} <span class="text-lg font-normal text-gray-500">ETH</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Staked Amount Card -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
          <div class="p-8">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-100 p-4 rounded-xl">
                <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="ml-6">
                <h3 class="text-lg font-medium text-gray-500">Token Balance</h3>
                <p class="mt-2 text-3xl font-bold text-gray-900">
                  {{ wallet.tokenBalance  }} <span class="text-lg font-normal text-gray-500">HIVE</span>
                </p>
              </div>
            </div>
          </div>
        </div>

 <!-- Token Balance -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
          <div class="p-8">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-100 p-4 rounded-xl">
                <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="ml-6">
                <h3 class="text-lg font-medium text-gray-500">Staked Amount</h3>
                <p class="mt-2 text-3xl font-bold text-gray-900">
                  {{ formattedStakedAmount }} <span class="text-lg font-normal text-gray-500">USDT</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Pending Rewards Card -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
          <div class="p-8">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-yellow-100 p-4 rounded-xl">
                <svg class="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-6">
                <h3 class="text-lg font-medium text-gray-500">Pending Rewards</h3>
                <p class="mt-2 text-3xl font-bold text-gray-900">
                  {{ formattedPendingRewards }} <span class="text-lg font-normal text-gray-500">HIVE</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Panel -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Staking Actions</h2>
          
          <div class="grid gap-8 md:grid-cols-2">
            <!-- Stake Form -->
            <div class="space-y-6">
              <div>
                <label for="stake-amount" class="block text-lg font-medium text-gray-700 mb-3">Amount to Stake</label>
                <div class="relative rounded-md shadow-sm">
                    <input
          v-model="stakeAmount"
          type="number"
          id="stake-amount"
          class="block w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
          placeholder="10"
          min="0"
          :max="Number(wallet.formattedHiveBalance)"
          step="any"
        >
                  <div class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                    <span class="text-gray-500 text-lg">HIVE</span>
                  </div>
                </div>
                <p class="mt-2 text-sm text-gray-500">
                  Available: {{ wallet.tokenBalance }} HIVE
                </p>
              </div>
              
            <button
      @click="stake"
      :disabled="isStaking || !wallet.isConnected || !stakeAmount || Number(stakeAmount) <= 0"
      class="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    >
      <svg v-if="isStaking" class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
       {{ isStaking ? 'Processing...' : 'Stake Tokens' }}
    </button>
            </div>

            <!-- Claim Rewards -->
            <div class="space-y-6">
              <div class="bg-gray-50 p-6 rounded-xl">
                <h3 class="text-lg font-medium text-gray-900 mb-3">Your Rewards</h3>
                <p class="text-2xl font-bold text-gray-900 mb-4">
                  {{ formattedPendingRewards }} <span class="text-lg font-normal text-gray-500">HIVE</span>
                </p>
                <button
                  @click="claim"
                  :disabled="isClaiming || !wallet.isConnected || Number(wallet.formattedPendingRewards) <= 0"
                  class="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <svg v-if="isClaiming" class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isClaiming ? 'Processing...' : 'Claim Rewards' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Connection Status -->
          <div v-if="!wallet.isConnected" class="mt-10 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-yellow-800">Wallet not connected </h3>
                <div class="mt-2 text-base text-yellow-700">
                  <p>Connect your wallet to stake tokens and earn rewards.</p>
                </div>
                <div class="mt-4">
                  <button
                    @click="wallet.connectWallet"
                    class="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-xl shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
                  >
                    Connect Wallet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Status Toast -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="txStatus" class="fixed bottom-6 right-6 w-full max-w-md">
        <div :class="`rounded-xl shadow-lg ${txStatus.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border p-4`">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg v-if="txStatus.success" class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p :class="`text-lg font-medium ${txStatus.success ? 'text-green-800' : 'text-red-800'}`">
                {{ txStatus.message }}
              </p>
              <div v-if="txStatus.txHash" class="mt-2">
                <a 
                  :href="`https://etherscan.io/tx/${txStatus.txHash}`" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-base font-medium text-blue-600 hover:text-blue-500"
                >
                  View on Etherscan ↗
                </a>
              </div>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button 
                @click="txStatus = null"
                class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
 

<script setup>
import { ref, watch, computed } from 'vue';
import { ethers } from 'ethers';
import { useWalletStore } from '@/stores/walletStore';

const wallet = useWalletStore();
const stakeAmount = ref('10');
const isStaking = ref(false);
const isClaiming = ref(false);
const txStatus = ref(null);

// Auto-load when connected
watch(() => wallet.isConnected, (connected) => {
  if (connected) wallet.loadStakingData();
 
}, { immediate: true });

// Formatted values
const formattedWalletBalance = computed(() => {
  return Number(wallet.totalBalance).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  });
});

const formattedStakedAmount = computed(() => {
  return Number(wallet.stakedAmount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  });
});

const formattedPendingRewards = computed(() => {
  return Number(wallet.pendingRewards).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  });
});

const stake = async () => {
  if (!stakeAmount.value || isStaking.value || !wallet.isConnected) return;
  
  try {
    isStaking.value = true;
    txStatus.value = null;
    const amount = stakeAmount.value.toString();
    // const amount = ethers.parseUnits(stakeAmount.value.toString(), 18);
    const tx = await wallet.stake(amount);
    
    txStatus.value = {
      success: true,
      message: 'Staking transaction successful!',
      txHash: tx.hash
    };
    
    await wallet.loadStakingData();
  } catch (error) {
    console.error('Staking failed:', error);
    txStatus.value = {
      success: false,
      message: error.message || 'Staking transaction failed',
      txHash: null
    };
  } finally {
    isStaking.value = false;
  }
};

const claim = async () => {
  if (isClaiming.value || !wallet.isConnected) return;
  
  try {
    isClaiming.value = true;
    txStatus.value = null;
    
    const tx = await wallet.claimRewards();
    
    txStatus.value = {
      success: true,
      message: 'Rewards claimed successfully!',
      txHash: tx.hash
    };
    
    await wallet.loadStakingData();
  } catch (error) {
    console.error('Claim failed:', error);
    txStatus.value = {
      success: false,
      message: error.message || 'Claim transaction failed',
      txHash: null
    };
  } finally {
    isClaiming.value = false;
  }
};

// Auto-hide tx status after 5 seconds
watch(txStatus, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      txStatus.value = null;
    }, 5000);
  }
}, { deep: true });
</script>