import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustSection from "../components/TrustSection";
import WhyPowerNex from "../components/WhyPowerNex";
import Achievements from "../components/Achievements";
import Services from "../components/Services";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import FeedbackSection from "../components/FeedbackSection";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <TopBar />
      <Header />
      <Hero />
      <TrustSection />
      <WhyPowerNex />
      <Achievements />
      <Services />
      <Partners />
      <Testimonials />
      <FeedbackSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
