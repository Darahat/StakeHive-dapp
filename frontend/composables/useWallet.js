// import ethers.js library for blockchain interaction
import { ether } from 'ethers'
// Import Vue reactivity utilities
import { ref, computed } from 'vue'
// create a reusable wallet composable
export const useWallet = () => {
    // Reactive state variables
    const account = ref(''); // Stores current wallet address
    const provider = ref(''); // Ethers provider for blockchain Connnection
    const signer = ref('');
    const isConnected = computed(() => !!account.value);

    constWallet = async () => {
        if (!window.ethereum) {
            alert('Please install Metamask');
            return;
        }
        
    }
    
}