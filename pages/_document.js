import React from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import createEmotionServer from "@emotion/server/create-instance";
import Document, { Html, Head, Main, NextScript } from "next/document";
export default class ASP extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

ASP.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
      enhanceComponent: (Component) => (props) =>
        (
          <CacheProvider value={cache}>
            <Component {...props} />
          </CacheProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStylesTages = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join("")}`}
      key={style.key}
      dangerouslySetInnerHTML={{
        __html: style.css,
      }}
    />
  ));
  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStylesTages,
    ],
  };
};
