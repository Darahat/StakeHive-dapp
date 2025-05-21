const hre = require("hardhat");

async function main() {
    const initialSupply = hre.ethers.parseUnits("1000000", 18);
    const HiveToken = await hre.ethers.getContractFactory("HiveToken");
    const hiveToken = await HiveToken.deploy();
    await hiveToken.waitForDeployment(); // ✅ This is the correct usage
    console.log("Coin deployed to:", hiveToken.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
