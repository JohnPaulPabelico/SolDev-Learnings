"use client";
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import WalletContextProvider from "../components/WalletContextProvider";
import { AppBar } from "../components/AppBar";
import { PingButton } from "../components/PingButton";
import Head from "next/head";
import { BalanceDisplay } from "@/components/BalanceDisplay";
import { SendSol } from "@/components/SendSol";

export default function Home() {
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <BalanceDisplay />
          <SendSol />
          {/* <PingButton /> */}
        </div>
      </WalletContextProvider>
    </div>
  );
}
