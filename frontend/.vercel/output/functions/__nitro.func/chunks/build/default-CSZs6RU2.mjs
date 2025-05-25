import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-Cf8azEJo.mjs';
import { ref, withCtx, createBlock, createVNode, openBlock, createTextVNode, unref, mergeProps, useSSRContext } from 'vue';
import { u as useWalletStore } from './walletStore-KsZt8rDQ.mjs';
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
import './server.mjs';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'deep-pick-omit';
import 'ethers';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main$2 = {
  __name: "buttonComponent",
  __ssrInlineRender: true,
  props: {
    variant: {
      type: String,
      default: "primary",
      // 'primary' | 'accent' | 'secondary'
      validator: (value) => ["primary", "accent", "secondary"].includes(value)
    },
    // Display Modes
    displayMode: {
      type: String,
      default: "wallet",
      validator: (value) => ["wallet", "text", "custom"].includes(value)
    },
    account: {
      type: String,
      default: ""
    },
    defaultText: {
      type: String,
      default: "Connect Wallet"
    },
    networkName: {
      type: String,
      default: "Sepolia"
    },
    dynamicContent: [String, Number],
    //Icon Options
    variant: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "accent", "secondary"].includes(value)
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const shortenAddress = (addr) => {
      const addressStr = String(addr || "");
      return addressStr ? `${addressStr.substring(0, 6)}...${addressStr.substring(addressStr.length - 4)}` : "";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: [
          "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
          {
            "bg-hive-primary hover:bg-hive-primary-dark text-white": __props.variant === "primary",
            "bg-hive-accent hover:bg-hive-accent-dark text-white": __props.variant === "accent",
            "bg-gray-200 hover:bg-gray-300 text-gray-800": __props.variant === "secondary"
          }
        ]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
        if (__props.showIcon) {
          _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      if (!_ctx.$slots.default) {
        _push(`<span>`);
        if (__props.displayMode === "wallet") {
          _push(`<!--[-->${ssrInterpolate(__props.account ? shortenAddress(__props.account) : "Connect Wallet")}<!--]-->`);
        } else if (__props.displayMode === "text") {
          _push(`<!--[--><span class="text-hive-accent">\u25CF</span><span>${ssrInterpolate(__props.networkName)}</span><!--]-->`);
        } else if (__props.displayMode === "custom") {
          _push(`<!--[-->${ssrInterpolate(__props.dynamicContent)}<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/buttonComponent.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "navigation",
  __ssrInlineRender: true,
  setup(__props) {
    const wallet = useWalletStore();
    const mobileMenuOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><nav class="bg-hive-dark text-white shadow-lg fixed w-full z-10"><div class="container mx-auto px-4 py-3 flex justify-between items-center md:hidden">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center space-x-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-8 h-8 text-hive-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId}></path></svg><span class="text-xl font-bold"${_scopeId}>StakeHive</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-8 h-8 text-hive-primary",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                })
              ])),
              createVNode("span", { class: "text-xl font-bold" }, "StakeHive")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="p-2 focus:outline-none"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div><div class="container mx-auto px-4"><div class="${ssrRenderClass({ "hidden": !mobileMenuOpen.value, "md:flex": true, "md:items-center": true, "md:justify-between": true, "py-3": true })}"><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "hidden md:flex items-center space-x-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-8 h-8 text-hive-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId}></path></svg><span class="text-xl font-bold"${_scopeId}>StakeHive</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-8 h-8 text-hive-primary",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                })
              ])),
              createVNode("span", { class: "text-xl font-bold" }, "StakeHive")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex space-x-1 ml-10">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: "px-3 py-2 rounded-md text-sm font-medium hover:bg-hive-dark-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Dashboard`);
          } else {
            return [
              createTextVNode("Dashboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/stake",
        class: "px-3 py-2 rounded-md text-sm font-medium hover:bg-hive-dark-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Stake`);
          } else {
            return [
              createTextVNode("Stake")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/rewards",
        class: "px-3 py-2 rounded-md text-sm font-medium hover:bg-hive-dark-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Rewards`);
          } else {
            return [
              createTextVNode("Rewards")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/docs",
        class: "px-3 py-2 rounded-md text-sm font-medium hover:bg-hive-dark-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Docs`);
          } else {
            return [
              createTextVNode("Docs")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex items-center space-x-4"><div class="hidden md:block px-3 py-1 bg-hive-dark-light rounded-full text-xs"><span class="text-hive-accent">\u25CF</span><span>Sepolia</span></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        displayMode: "wallet",
        variant: "primary",
        showIcon: true,
        onClick: unref(wallet).connectWallet,
        account: unref(wallet).account
      }, null, _parent));
      _push(`</div></div></div></nav><div class="${ssrRenderClass({ "hidden": !mobileMenuOpen.value, "md:hidden": true, "bg-hive-dark-light": true })}"><div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: "block px-3 py-2 rounded-md text-base font-medium hover:bg-hive-dark",
        onClick: ($event) => mobileMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/stake",
        class: "block px-3 py-2 rounded-md text-base font-medium hover:bg-hive-dark",
        onClick: ($event) => mobileMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Stake `);
          } else {
            return [
              createTextVNode(" Stake ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/rewards",
        class: "block px-3 py-2 rounded-md text-base font-medium hover:bg-hive-dark",
        onClick: ($event) => mobileMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Rewards `);
          } else {
            return [
              createTextVNode(" Rewards ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/docs",
        class: "block px-3 py-2 rounded-md text-base font-medium hover:bg-hive-dark",
        onClick: ($event) => mobileMenuOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Docs `);
          } else {
            return [
              createTextVNode(" Docs ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="px-3 py-4 border-t border-hive-dark"><div class="flex items-center justify-between"><span class="text-sm">Network: <span class="text-hive-accent">Sepoliad</span></span><button class="text-hive-primary text-sm font-medium">Switch</button>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        displayMode: "wallet",
        variant: "primary",
        showIcon: true,
        onClick: unref(wallet).connectWallet,
        account: unref(wallet).account
      }, null, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/navigation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-CSZs6RU2.mjs.map
