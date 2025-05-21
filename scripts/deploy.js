const hre = require("hardhat");

async function main() {
    const MyCoin = await hre.ethers.getContractFactory("MyCoin");
    const coin = await MyCoin.deploy();
    await coin.waitForDeployment(); // ✅ This is the correct usage
    console.log("Coin deployed to:", coin.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
