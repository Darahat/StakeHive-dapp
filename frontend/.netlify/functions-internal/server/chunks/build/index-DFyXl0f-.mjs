import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { ref, watch, computed, mergeProps, unref, useSSRContext } from 'vue';
import { u as useWalletStore } from './walletStore-KsZt8rDQ.mjs';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'pinia-plugin-persistedstate';
import 'ethers';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$1 = {
  __name: "StakeCard",
  __ssrInlineRender: true,
  setup(__props) {
    const wallet = useWalletStore();
    const stakeAmount = ref("10");
    const isStaking = ref(false);
    const isClaiming = ref(false);
    const txStatus = ref(null);
    const withdrawAmount = ref("0");
    const isWithdrawing = ref(false);
    watch(() => wallet.isConnected, (connected) => {
      if (connected) wallet.loadStakingData();
    }, { immediate: true });
    const formatNumber = (value) => {
      const num = Number(value);
      if (isNaN(num)) return "0";
      return num.toLocaleString(void 0, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      });
    };
    function formatNumberShort(value) {
      const num = Number(value);
      if (isNaN(num)) return value;
      const absNum = Math.abs(num);
      if (absNum >= 1e24) return (num / 1e24).toFixed(2) + "Sp";
      if (absNum >= 1e21) return (num / 1e21).toFixed(2) + "Sx";
      if (absNum >= 1e18) return (num / 1e18).toFixed(2) + "Qi";
      if (absNum >= 1e15) return (num / 1e15).toFixed(2) + "Qa";
      if (absNum >= 1e12) return (num / 1e12).toFixed(2) + "T";
      if (absNum >= 1e9) return (num / 1e9).toFixed(2) + "B";
      if (absNum >= 1e6) return (num / 1e6).toFixed(2) + "M";
      if (absNum >= 1e3) return (num / 1e3).toFixed(2) + "K";
      return num.toFixed(2);
    }
    const formattedWalletBalance = computed(() => {
      return Number(wallet.totalBalance).toLocaleString(void 0, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      });
    });
    computed(() => {
      return Number(wallet.stakedAmount).toLocaleString(void 0, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      });
    });
    computed(() => {
      return Number(wallet.pendingRewards).toLocaleString(void 0, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      });
    });
    watch(txStatus, (newVal) => {
      if (newVal) {
        setTimeout(() => {
          txStatus.value = null;
        }, 5e3);
      }
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="mb-10 text-center"><h2 class="text-3xl font-bold text-gray-900 mb-2">Staking Dashboard</h2><p class="text-lg text-gray-600 max-w-2xl mx-auto"> Stake your HIVE tokens to earn passive rewards </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"><div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><div class="flex items-center space-x-4"><div class="p-3 rounded-lg bg-blue-50"><svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-sm font-medium text-gray-500">Wallet Balance</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(formatNumber(formattedWalletBalance.value))} <span class="text-gray-500 text-lg">ETH</span></p></div></div></div><div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><div class="flex items-center space-x-4"><div class="p-3 rounded-lg bg-green-50"><svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div><div><p class="text-sm font-medium text-gray-500">HIVE Balance</p><p class="text-sm font-semibold text-gray-900">${ssrInterpolate(formatNumberShort(unref(wallet).tokenBalance))} <span class="text-gray-500 text-lg">HIVE</span></p></div></div></div><div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><div class="flex items-center space-x-4"><div class="p-3 rounded-lg bg-purple-50"><svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-sm font-medium text-gray-500">Staked Amount</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(formatNumberShort(unref(wallet).stakedAmount))} <span class="text-gray-500 text-lg">HIVE</span></p></div></div></div><div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><div class="flex items-center space-x-4"><div class="p-3 rounded-lg bg-yellow-50"><svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-sm font-medium text-gray-500">Pending Rewards</p><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(formatNumberShort(unref(wallet).pendingRewards))} <span class="text-gray-500 text-lg">HIVE</span></p></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><h3 class="text-lg font-semibold text-gray-900 mb-6">Stake HIVE</h3><div class="space-y-4"><div><label for="stake-amount" class="block text-sm font-medium text-gray-700 mb-2">Amount to Stake</label><div class="relative rounded-md shadow-sm"><input${ssrRenderAttr("value", stakeAmount.value)} type="number" id="stake-amount" class="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="0.0" min="0"${ssrRenderAttr("max", unref(wallet).tokenBalance)} step="any"><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><span class="text-gray-500 text-sm">HIVE</span></div></div><div class="flex justify-between mt-2"><p class="text-xs text-gray-500">Available: ${ssrInterpolate(formatNumberShort(unref(wallet).tokenBalance))} HIVE</p><button class="text-xs text-blue-600 hover:text-blue-800"> Max </button></div></div><button${ssrIncludeBooleanAttr(isStaking.value || !unref(wallet).isConnected || !stakeAmount.value || Number(stakeAmount.value) <= 0) ? " disabled" : ""} class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors">`);
      if (isStaking.value) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(isStaking.value ? "Processing..." : "Stake Tokens")}</button></div></div><div class="space-y-6"><div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><h3 class="text-lg font-semibold text-gray-900 mb-6">Withdraw HIVE</h3><div class="space-y-4"><div><label for="withdraw-amount" class="block text-sm font-medium text-gray-700 mb-2">Amount to Withdraw</label><div class="relative rounded-md shadow-sm"><input${ssrRenderAttr("value", withdrawAmount.value)} type="number" id="withdraw-amount" class="block w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500" placeholder="0.0" min="0"${ssrRenderAttr("max", unref(wallet).stakedAmount)} step="any"><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><span class="text-gray-500 text-sm">HIVE</span></div></div><div class="flex justify-between mt-2"><p class="text-xs text-gray-500">Staked: ${ssrInterpolate(formatNumberShort(unref(wallet).stakedAmount))} HIVE</p><button class="text-xs text-purple-600 hover:text-purple-800"> Max </button></div></div><button${ssrIncludeBooleanAttr(isWithdrawing.value || !unref(wallet).isConnected || !withdrawAmount.value || Number(withdrawAmount.value) <= 0) ? " disabled" : ""} class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors">`);
      if (isWithdrawing.value) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(isWithdrawing.value ? "Processing..." : "Withdraw Tokens")}</button></div></div><div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><h3 class="text-lg font-semibold text-gray-900 mb-6">Claim Rewards</h3><div class="flex items-center justify-between mb-4"><p class="text-sm text-gray-500">Available rewards</p><p class="text-lg font-semibold text-gray-900">${ssrInterpolate(formatNumberShort(unref(wallet).pendingRewards))} HIVE </p></div><button${ssrIncludeBooleanAttr(isClaiming.value || !unref(wallet).isConnected || Number(unref(wallet).pendingRewards) <= 0) ? " disabled" : ""} class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors">`);
      if (isClaiming.value) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(isClaiming.value ? "Processing..." : "Claim Rewards")}</button></div></div></div></main>`);
      if (txStatus.value) {
        _push(`<div class="fixed bottom-4 right-4 max-w-sm w-full"><div class="${ssrRenderClass(`rounded-lg shadow-lg overflow-hidden ${txStatus.value.success ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100"}`)}"><div class="p-4"><div class="flex items-start"><div class="flex-shrink-0">`);
        if (txStatus.value.success) {
          _push(`<svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`);
        } else {
          _push(`<svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`);
        }
        _push(`</div><div class="ml-3 flex-1 pt-0.5"><p class="${ssrRenderClass(`text-sm font-medium ${txStatus.value.success ? "text-green-800" : "text-red-800"}`)}">${ssrInterpolate(txStatus.value.message)}</p>`);
        if (txStatus.value.txHash) {
          _push(`<div class="mt-1"><a${ssrRenderAttr("href", `https://etherscan.io/tx/${txStatus.value.txHash}`)} target="_blank" rel="noopener noreferrer" class="text-xs font-medium text-blue-600 hover:text-blue-500"> View on Etherscan \u2197 </a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="ml-4 flex-shrink-0 flex"><button class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"><span class="sr-only">Close</span><svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StakeCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(_attrs)}><div class="p-6"><h1 class="text-2xl font-bold mb-4">\u{1F41D} StakeHive DApp</h1>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div></main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DFyXl0f-.mjs.map
