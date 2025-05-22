// import ethers.js library for blockchain interaction
import { ether } from 'ethers'
// Import Vue reactivity utilities
import { ref, computed } from 'vue'
// create a reusable wallet composable
export const useWallet = () => {
    // Reactive state variables
    const account = ref(''); // Stores current wallet address
    const provider = ref(''); // Ethers provider for blockchain Connnection
    const signer = ref(''); // Ethers signer for transaction signing
    const isConnected = computed(() => !!account.value); // Computed property for connection status

    // Wallet connection handler
    constWallet = async () => {
        // Check if MetaMask is installed
        if (!window.ethereum) {
            alert('Please install Metamask'); // User Feedback if no wallet detected
            return;
        }

        try {
            // Request account access from MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Initialize ethers provider with metaMask's provider
            provider.value = new ethers.providers.Web3Provider(window.ethereum);
        }
        
    }
    
}