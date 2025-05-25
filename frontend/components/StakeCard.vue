<template>
  <div class="min-h-screen bg-gray-50">
 

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Dashboard Header -->
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Staking Dashboard</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Stake your HIVE tokens to earn passive rewards
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <!-- Wallet Balance -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center space-x-4">
            <div class="p-3 rounded-lg bg-blue-50">
              <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Wallet Balance</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ formatNumber(formattedWalletBalance) }} <span class="text-gray-500 text-lg">ETH</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Token Balance -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center space-x-4">
            <div class="p-3 rounded-lg bg-green-50">
              <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">HIVE Balance</p>
              <p class="text-sm font-semibold text-gray-900">
                {{ formatNumberShort(wallet.tokenBalance) }} <span class="text-gray-500 text-lg">HIVE</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Staked Amount -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center space-x-4">
            <div class="p-3 rounded-lg bg-purple-50">
              <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Staked Amount</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ formatNumberShort(wallet.stakedAmount ) }} <span class="text-gray-500 text-lg">HIVE</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Pending Rewards -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center space-x-4">
            <div class="p-3 rounded-lg bg-yellow-50">
              <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Pending Rewards</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{ formatNumberShort(wallet.pendingRewards ) }} <span class="text-gray-500 text-lg">HIVE</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Panels -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Stake Panel -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Stake HIVE</h3>
          <div class="space-y-4">
            <div>
              <label for="stake-amount" class="block text-sm font-medium text-gray-700 mb-2">Amount to Stake</label>
              <div class="relative rounded-md shadow-sm">
                <input
                  v-model="stakeAmount"
                  type="number"
                  id="stake-amount"
                  class="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.0"
                  min="0"
                  :max="wallet.tokenBalance"
                  step="any"
                >
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span class="text-gray-500 text-sm">HIVE</span>
                </div>
              </div>
              <div class="flex justify-between mt-2">
                <p class="text-xs text-gray-500">Available: {{ formatNumberShort(wallet.tokenBalance) }} HIVE</p>
                <button 
                  @click="stakeAmount = wallet.tokenBalance"
                  class="text-xs text-blue-600 hover:text-blue-800"
                >
                  Max
                </button>
              </div>
            </div>
            <button
              @click="stake"
              :disabled="isStaking || !wallet.isConnected || !stakeAmount || Number(stakeAmount) <= 0"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="isStaking" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isStaking ? 'Processing...' : 'Stake Tokens' }}
            </button>
          </div>
  
        </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
  <h3 class="text-lg font-semibold text-gray-900 mb-6">Transfer HIVE</h3>
  <div class="space-y-4">
    <div>
      <label for="recipient-address" class="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
      <input
        v-model="recipient"
        id="recipient-address"
        type="text"
        class="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        placeholder="0x..."
      >
    </div>
    
    <div>
      <label for="transfer-amount" class="block text-sm font-medium text-gray-700 mb-2">Amount to Transfer</label>
      <div class="relative rounded-md shadow-sm">
        <input
          v-model="amount"
          type="number"
          id="transfer-amount"
          class="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="0.0"
          min="0"
          :max="wallet.tokenBalance"
          step="any"
        >
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span class="text-gray-500 text-sm">HIVE</span>
        </div>
      </div>
      <div class="flex justify-between mt-2">
        <p class="text-xs text-gray-500">Available: {{ formatNumberShort(wallet.tokenBalance) }} HIVE</p>
        <button 
          @click="amount = wallet.tokenBalance"
          class="text-xs text-blue-600 hover:text-blue-800"
        >
          Max
        </button>
      </div>
    </div>
    
    <button
      @click="handleTransfer"
      :disabled="isTransferring || !wallet.isConnected || !recipient || !amount || Number(amount) <= 0"
      class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
    >
      <svg v-if="isTransferring" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {{ isTransferring ? 'Processing...' : 'Transfer HIVE' }}
    </button>

    <div v-if="txHash" class="mt-4 p-3 bg-green-50 rounded-lg">
      <p class="text-sm text-green-800">
        Transfer successful! 
        <a :href="`https://etherscan.io/tx/${txHash}`" target="_blank" class="text-blue-600 hover:underline">
          View on Explorer
        </a>
      </p>
    </div>
  </div>
</div>
        <!-- Withdraw & Claim Panel -->
        <div class="space-y-6">
          <!-- Withdraw Card -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Withdraw HIVE</h3>
            <div class="space-y-4">
              <div>
                <label for="withdraw-amount" class="block text-sm font-medium text-gray-700 mb-2">Amount to Withdraw</label>
                <div class="relative rounded-md shadow-sm">
                  <input
                    v-model="withdrawAmount"
                    type="number"
                    id="withdraw-amount"
                    class="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    placeholder="0.0"
                    min="0"
                    :max="wallet.stakedAmount"
                    step="any"
                  >
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span class="text-gray-500 text-sm">HIVE</span>
                  </div>
                </div>
                <div class="flex justify-between mt-2">
                  <p class="text-xs text-gray-500">Staked: {{ formatNumberShort(wallet.stakedAmount) }} HIVE</p>
                  <button 
                    @click="withdrawAmount = wallet.stakedAmount"
                    class="text-xs text-purple-600 hover:text-purple-800"
                  >
                    Max
                  </button>
                </div>
              </div>
              <button
                @click="withdraw"
                :disabled="isWithdrawing || !wallet.isConnected || !withdrawAmount || Number(withdrawAmount) <= 0"
                class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                <svg v-if="isWithdrawing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isWithdrawing ? 'Processing...' : 'Withdraw Tokens' }}
              </button>
            </div>
          </div>

          <!-- Claim Card -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Claim Rewards</h3>
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm text-gray-500">Available rewards</p>
              <p class="text-lg font-semibold text-gray-900">
                {{ formatNumberShort(wallet.pendingRewards) }} HIVE
              </p>
            </div>
            <button
              @click="claim"
              :disabled="isClaiming || !wallet.isConnected || Number(wallet.pendingRewards) <= 0"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="isClaiming" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isClaiming ? 'Processing...' : 'Claim Rewards' }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Transaction Notification -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="txStatus" class="fixed bottom-4 right-4 max-w-sm w-full">
        <div :class="`rounded-lg shadow-lg overflow-hidden ${txStatus.success ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg v-if="txStatus.success" class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3 flex-1 pt-0.5">
                <p :class="`text-sm font-medium ${txStatus.success ? 'text-green-800' : 'text-red-800'}`">
                  {{ txStatus.message }}
                </p>
                <div v-if="txStatus.txHash" class="mt-1">
                  <a 
                    :href="`https://etherscan.io/tx/${txStatus.txHash}`" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-xs font-medium text-blue-600 hover:text-blue-500"
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
      </div>
    </transition>
  </div>
</template>
 

<script setup>
import { ref, watch, computed, onMounted,onBeforeUnmount } from 'vue';
import { ethers } from 'ethers';
import { useWalletStore } from '@/stores/walletStore';

const wallet = useWalletStore();
const stakeAmount = ref('10');
const isStaking = ref(false);
const isClaiming = ref(false);
const txStatus = ref(null);
const withdrawAmount = ref('0');
const isWithdrawing = ref(false);
const isTransferring = ref(false);
const recipient = ref('');
const amount = ref('');
const txHash = ref('');
let intervalId;

// Auto-load when connected
watch(() => wallet.isConnected, (connected) => {
  if (connected) wallet.loadStakingData();
 
}, { immediate: true });

async function handleTransfer() {
  const result = await wallet.transferHiveToken(recipient.value, amount.value);
  console.log(recipient.value, amount.value);
  console.log(result);
  if (result.success) {
    txHash.value = result.hash;
    recipient.value = '';
    amount.value = '';
  } else {
    alert('Error transferring tokens: ' + result.error);
  }
 }

// Auto-refresh logic
if (wallet.isMetaMaskInstalled()) {

  onMounted(() => {
    // Initial fetch
    wallet.getStakingData();

    // Refresh every second
    intervalId = setInterval(() => {
      wallet.getStakingData();
    }, 1000);
  });

  onBeforeUnmount(() => {
    clearInterval(intervalId); // Clean up
  });
}
//formate all numbers
const formatNumber = (value) => {
  const num = Number(value);
  if (isNaN(num)) return '0';
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  })
}
function formatNumberShort(value) {
  const num = Number(value);
  if (isNaN(num)) return value;

  const absNum = Math.abs(num);
//  if (absNum >= 1e27) return (num / 1e27).toFixed(2) + 'Oc'; // Octillion
  if (absNum >= 1e24) return (num / 1e24).toFixed(2) + 'Sp'; // Septillion
  if (absNum >= 1e21) return (num / 1e21).toFixed(2) + 'Sx'; // Sextillion
  if (absNum >= 1e18) return (num / 1e18).toFixed(2) + 'Qi'; // Quintillion
  if (absNum >= 1e15) return (num / 1e15).toFixed(2) + 'Qa'; // Quadrillion
  if (absNum >= 1e12) return (num / 1e12).toFixed(2) + 'T';  // Trillion
  if (absNum >= 1e9)  return (num / 1e9).toFixed(2) + 'B';   // Billion
  if (absNum >= 1e6)  return (num / 1e6).toFixed(2) + 'M';   // Million
  if (absNum >= 1e3)  return (num / 1e3).toFixed(2) + 'K';   // Thousand

  return num.toFixed(2); // Optional: always show 2 decimals
}
const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};
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
const withdraw  = async () => {
  if (!withdrawAmount.value || Number(withdrawAmount.value) <= 0) return;
  isWithdrawing.value = true;
  txStatus.value = null;
  try {
    const result = await wallet.withdraw(withdrawAmount.value);
    console.log('Withdraw result:',result);
     if (result.error) {
      throw new Error(result.error);
    }
    txStatus.value = {
      success: true,
      message: 'Withdrawal  successful!',
      txHash: result.hash
    }
        withdrawAmount.value = '';  // Clear input after successful withdrawal

  } catch (error) {
console.error("Withdrawal error:", error);
    throw error;
    
  } finally {
    isWithdrawing.value = false;
  }
}
// Auto-hide tx status after 5 seconds
watch(txStatus, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      txStatus.value = null;
    }, 5000);
  }
}, { deep: true });
</script>