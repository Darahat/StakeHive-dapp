export const useWeb3 = () => { 
    const { $web3Provider, $ethers } = useNuxtApp();
    const account = ref("");
    const connectWallet = async () => {
        const signer = await $web3Provider.getSigner();
        account.value = await signer.getAddress();
    }
    return {
        account,
        connectWallet
    }
}