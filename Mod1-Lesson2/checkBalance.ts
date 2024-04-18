import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const mainnetEndpoint = "https://api.mainnet-beta.solana.com"; // Mainnet endpoint

const wallets = [
    { name: "toly.sol", publicKey: "tqTsVvYhMGNgbEkvCYSFE5ZGmQYKjgKfGt5Wb69tXgr" },
    { name: "shaq.sol", publicKey: "F9h3K8Euo5wM1qtYwD1YYLTCyq3WhX2t3Yb5qnHsLftG" },
    { name: "mccann.sol", publicKey: "G7nZbnJ5JX1zsebpMNKiSAnfgr1iYE8R8zQ5mpPjKxn7" }
];

async function getBalanceForWallet(wallet) {
    const connection = new Connection(mainnetEndpoint, "confirmed");
    const publicKey = new PublicKey(wallet.publicKey);

    try {
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
        console.log(`✅ Finished! The balance for the wallet ${wallet.name} at address ${publicKey} is ${balanceInSOL} SOL`);
    } catch (error) {
        console.error(`❌ Error fetching balance for ${wallet.name}: ${error.message}`);
    }
}

async function main() {
    for (const wallet of wallets) {
        await getBalanceForWallet(wallet);
    }
}

main();
