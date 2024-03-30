import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const meta = {
    title: "Tungdo -  a small blog",
    description: "gossip for tech haha",
    image: "",
    author: "Tùng Đỗ Minh"
  };

  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tungdevpro" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="author" content={meta.author} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
