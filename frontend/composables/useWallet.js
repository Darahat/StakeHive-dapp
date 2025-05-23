// import ethers.js library for blockchain interaction
import { ethers, BrowserProvider} from 'ethers'
// Import Vue reactivity utilities
import { ref, computed } from 'vue'
// create a reusable wallet composable
export const useWallet = () => {
        const { $web3Provider, $ethers } = useNuxtApp();

    // Reactive state variables
    const account = ref(null); // Stores current wallet address
    const provider = ref(null); // Ethers provider for blockchain Connnection
    const signer = ref(null); // Ethers signer for transaction signing
    const isConnected = computed(() => !!account.value); // Computed property for connection status

    // Wallet connection handler
    const connectWallet = async () => {
        // Check if MetaMask is installed
        if (!window.ethereum) {
            alert('Please install Metamask'); // User Feedback if no wallet detected
            return;
        }

        try {
            // Request account access from MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Initialize ethers provider with metaMask's provider
            // provider.value = new BrowserProvider(window.ethereum);
            // console.log(provider.value);
            // Get signer for transaction signing capability
            // signer.value = provider.value.getSigner();
            const signer = await $web3Provider.getSigner();
                        console.log(signer);

            // Get current connected account address
            account.value = await signer.getAddress();
                        console.log( account.value );

        } catch (error) {
            console.error('Connection Error:', error); // Log Connection errors
        }
        
    }
    // Expose these to components using this composable
    return {
        account, //User's wallet address
        provider, // Blockchain connection provider
        signer, // Transaction signer
        isConnected, // boolean connection status
        connectWallet, // Connection handler

    }
    
}