import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../TopBar";
import Header from "../Header";
import Footer from "../Footer";

export default function SiteLayout({ children }) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);

    return (
        <div className="site-shell">
            <TopBar />
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
