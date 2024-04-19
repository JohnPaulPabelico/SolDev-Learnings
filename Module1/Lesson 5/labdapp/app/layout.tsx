"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");
const inter = Inter({ subsets: ["latin"] });
import * as web3 from "@solana/web3.js";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [rendered, setrendered] = useState(false);

  useEffect(() => {
    setrendered(true);
  }, [setrendered]);

  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {rendered && (
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        )}
      </body>
    </html>
  );
}
