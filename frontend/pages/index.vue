<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <!-- Card Container -->
         <div class="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
<!-- card header -->
<div class="bg-blue-600 p-6 text-white">
 <h2 class="text-2xl font-bold">dApp</h2>
 <p class="text-blue-100">Get Account</p>

</div>
<div class="p-6 space-y-4">
 <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200" @click="connectWallet">Connect Wallet</button>
        <p v-if="account"> Connected: {{account  }}</p>
</div>
</div>
       
    </div>
</template>
<script setup>
import { useWeb3 } from '~/composables/useWeb3';

const { account, connectWallet } = useWeb3();
</script>