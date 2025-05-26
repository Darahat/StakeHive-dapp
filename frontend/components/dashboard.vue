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
      <stakeCard/>
      <!-- Action Panels -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Stake Panel -->
        <amountToStake
        :formatedtokenBalance = formatNumberShort(wallet.tokenBalance)
        :wallet="wallet"
        />
        <transferHive
                :formatedtokenBalance = formatNumberShort(wallet.tokenBalance)
                :wallet="wallet"
        />
        <!-- Withdraw & Claim Panel -->
        <div class="space-y-6">
        <!-- Withdraw Card -->
        <withdrawHive
            :formatedStakedAmount = formatNumberShort(wallet.stakedAmount)
            :wallet = wallet
        />

        <!-- Claim Card -->
        <claimReward
            :formatedPendingRewards= formatNumberShort(wallet.pendingRewards)
            :wallet = wallet
        />
        
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
const txStatus = ref(null);
 
let intervalId;

// Auto-load when connected
watch(() => wallet.isConnected, (connected) => {
  if (connected) wallet.loadStakingData();
 
}, { immediate: true });
// Auto-refresh logic
 
  onMounted(() => {
    // Initial fetch
    if (typeof window !== 'undefined') {

      wallet.getStakingData();

      // Refresh every second
      intervalId = setInterval(() => {
        wallet.getStakingData();
      }, 1000);

    }
  });

  onBeforeUnmount(() => {
    clearInterval(intervalId); // Clean up
  });
 

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
 
// Auto-hide tx status after 5 seconds
watch(txStatus, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      txStatus.value = null;
    }, 5000);
  }
}, { deep: true });
</script>