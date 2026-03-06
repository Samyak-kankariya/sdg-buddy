import CallToActionSection from "@components/landingPage/CallToAction";
import FeaturesSection from "@components/landingPage/Feature";
import HeroSection from "@components/landingPage/Hero";
import SdgShowcase from "@components/landingPage/Showcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <HeroSection loginHref="/action" />
        <FeaturesSection />
        <SdgShowcase />
        <CallToActionSection loginHref="/action" />
      </main>
    </div>
  );
}