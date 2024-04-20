import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Transaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { FC, useState } from "react";

export const SendSol: FC = () => {
  const [txSig, setTxSig] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [toPublicKey, setToPublicKey] = useState<PublicKey | null>(null); // Change type to PublicKey | null
  const [amountToSend, setAmountToSend] = useState<number>(0);
  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const amountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setAmountToSend(Number(inputValue));
      console.log(inputValue);
    } else {
      setAmountToSend(0);
    }
  };

  const toPublicKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addressValue = e.target.value;
    const publicKeyRegex = /^[a-zA-Z0-9]{43,45}$/;

    if (publicKeyRegex.test(addressValue)) {
      setToPublicKey(new PublicKey(addressValue)); // Convert addressValue to PublicKey
      console.log(addressValue);
    } else {
      setToPublicKey(null);
      console.log("Invalid Solana public key format");
    }
  };

  const sendSol = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!connection || !publicKey) {
      return;
    }

    if (!toPublicKey) {
      console.error("Invalid recipient public key");
      return;
    }

    const recipientPubKey = new PublicKey(toPublicKey);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey!,
        toPubkey: recipientPubKey,
        lamports: LAMPORTS_PER_SOL * amountToSend,
      })
    );

    sendTransaction(transaction, connection).then((sig) => {
      setTxSig(sig);
    });
  };

  return (
    <div className="">
      <form onSubmit={sendSol}>
        {" "}
        {/* Use onSubmit event for form submission */}
        <div className="flex justify-center">Solana Address to send to:</div>
        <div>
          {" "}
          <input
            type="text"
            className="flex justify-center border rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent"
            value={toPublicKey ? toPublicKey.toBase58() : ""} // Use toBase58() to display PublicKey
            onChange={(e) => toPublicKeyChange(e)}
            placeholder="Enter address to send to"
            style={{ color: "black" }}
          />
        </div>
        <div className="flex justify-center">Amount SOL to send: </div>
        <input
          type="number"
          className="flex justify-center border rounded-md p-2 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:border-transparent"
          value={amountToSend}
          onChange={(e) => amountChange(e)}
          placeholder="Enter amount to send"
          style={{ color: "black" }}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 px-4 py-2 hover:bg-gray-300 bg-white rounded-lg text-black"
          >
            Send
          </button>
        </div>
      </form>
      {txSig ? (
        <div className="flex justify-center">
          <p>View your transaction on </p>
          <a href={link()}>Solana Explorer</a>
        </div>
      ) : null}
    </div>
  );
};
