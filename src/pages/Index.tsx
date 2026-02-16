import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PlatformSection } from "@/components/landing/PlatformSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <div className="fixed inset-0 mesh-gradient" />
      <div className="fixed inset-0 aurora-bg pointer-events-none" />
      <div className="grain-overlay" />
      
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <HeroSection />
          <FeaturesSection />
          <PlatformSection />
          <HowItWorksSection />
          <PricingSection />
          <ComparisonSection />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
