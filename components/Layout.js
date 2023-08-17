import Head from "next/head";
import Author from "./Author";
import Footer from "./Footer/Footer";
import FooterTip from "./FooterTip";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Tung Do Minh - Mobile App Development</title>
        <meta name="description" content="Tung Do Minh - Mobile App Development - Make things complicated :))" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
      <Footer />
      <FooterTip />
      {/* <Author /> */}
    </div>
  );
};

export default Layout;
