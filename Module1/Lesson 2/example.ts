import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey('1KeCyoxaDUnwAeXZFBB4xJGxVgp1s1WagkDE2beKmj5');
const balanceInLamports = await connection.getBalance(address);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`The balance of the account at ${address} is ${balanceInSol} SOL or ${balanceInLamports} Lamports`); 
console.log(`✅ Finished!`)