import Head from "next/head";
import { AuthContextProvider } from "../authCtx";
import "./globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Head>
        <title>Athlete Talk - A mental welness platform for Athletes</title>
        <link rel="icon" type="image/x-icon" href="/logo.jpg" />
        <meta
          name="description"
          content="We provide structured plans and videos for mental welness so you can train harder."
          key="desc"
        />
      </Head>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
