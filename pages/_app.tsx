import { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

// Global styles
import "../styles/global.scss";

import Layout from "../components/layout/Layout";

// Swiper scss
import "swiper/scss";

// Store
import { store } from "../fetchConfig/store";
import { Provider } from "react-redux";
import RouteLoading from "../components/loaders/RouteLoading";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Head>
        <title>Michael Ayeni </title>
        <meta
          name="description"
          content="The official website of Michael Ayeni, a full stack developer. Works with Node, React, Typescript, MongoDB, PostgreSQL"
        />
        <link rel="icon" href="/small-head.png" />
      </Head>
      <RouteLoading />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
