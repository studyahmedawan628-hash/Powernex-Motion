// src/pages/About.jsx
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import AboutHero from "../components/AboutHero";
import AboutIntro from "../components/AboutIntro";
import OurStory from "../components/OurStory";
import MissionVision from "../components/MissionVision";
import EngineeringPhilosophy from "../components/EngineeringPhilosophy";
import Achievements from "../components/Achievements";
import HowWeWork from "../components/HowWeWork";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
      <TopBar />
      <Header />
      <AboutHero />
      <AboutIntro />
      <OurStory />
      <MissionVision />
      <EngineeringPhilosophy />
      <Achievements />
      <HowWeWork />

      {/* Baaki About page ka content yahan neeche aayega */}

      <CTABanner />
      <Footer />
    </div>
  );
}
