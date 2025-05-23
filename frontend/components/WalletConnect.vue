<template>
  <div class="flex items-center space-x-4">
    <button
      v-if="!isConnected"
      @click="connectWallet"
      class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
    >
      Connect Wallet
    </button>
    <div v-else class="text-sm text-gray-700">
      ✅ {{ shortAddress(account) }}
    </div>
  </div>
</template>

<script setup>
const { connectWallet, isConnected, account } = useWallet()

const shortAddress = (addr) =>
  addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : ''
</script>