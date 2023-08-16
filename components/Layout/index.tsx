import Header from "../Header";
import Footer from "../Footer";

type LayoutProps = {
    hideFooter?: boolean;
    children: React.ReactNode;
};

const Layout = ({ hideFooter, children }: LayoutProps) => (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        {children}
        {hideFooter ? null : <Footer />}
    </div>
);

export default Layout;
