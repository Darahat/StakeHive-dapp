import { ethers, BrowserProvider  } from 'ethers';

export default defineNuxtPlugin(() => {
    let provider;
    if (typeof window !== 'undefined' && window.ethereum) {
        provider = new BrowserProvider(window.ethereum);
    }
        return {
            provide: {
                web3Provider: provider,
                ethers
            }
        }
    
    });