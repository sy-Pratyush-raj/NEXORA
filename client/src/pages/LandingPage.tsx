import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { InteractiveDemoSection } from '../components/landing/InteractiveDemoSection';
import { AIInsightsSection } from '../components/landing/AIInsightsSection';
import { AskNexoraSection } from '../components/landing/AskNexoraSection';
import { ChaosToClaritySection } from '../components/landing/ChaosToClaritySection';
import { FeaturesGridSection } from '../components/landing/FeaturesGridSection';
import { ProjectHealthSection } from '../components/landing/ProjectHealthSection';
import { ActivityTimelineSection } from '../components/landing/ActivityTimelineSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { FinalCTASection } from '../components/landing/FinalCTASection';
import { Footer } from '../components/landing/Footer';
import { NexoraFocusOverlay } from '../components/easter-egg/NexoraFocusOverlay';
import { useEasterEgg } from '../hooks/useEasterEgg';

export const LandingPage: React.FC = () => {
  const { isActive, close } = useEasterEgg();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Sticky Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Interactive Product Showcase & Tabs */}
      <div id="product">
        <InteractiveDemoSection />
      </div>

      {/* Flagship AI Insights Showcase */}
      <AIInsightsSection />

      {/* Interactive Ask Nexora Simulator */}
      <AskNexoraSection />

      {/* Metamorphosis: Chaos → Clarity */}
      <ChaosToClaritySection />

      {/* 4 Distinct Core Features */}
      <FeaturesGridSection />

      {/* Project Health Inspector */}
      <ProjectHealthSection />

      {/* Recent Activity Timeline */}
      <ActivityTimelineSection />

      {/* 3-Step How It Works */}
      <HowItWorksSection />

      {/* Final Conversion CTA */}
      <FinalCTASection />

      {/* Footer */}
      <Footer />

      {/* Easter Egg Overlay (Type NEXORA) */}
      <NexoraFocusOverlay isOpen={isActive} onClose={close} />
    </div>
  );
};
