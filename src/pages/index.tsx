import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      style={{
        height: "70rem",
        width: "100%",
        backgroundColor: "black",
      }}
    >
      Hello
    </div>
  );
}
