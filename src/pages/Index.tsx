import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// ETHEREAL Chat Widget API (loaded via ethereal-chat.js in index.html)
declare global {
  interface Window {
    EtherealChat?: {
      open: () => void;
      close: () => void;
      toggle: () => void;
      isOpen: () => boolean;
      destroy: () => void;
    };
  }
}
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import StorySection from "@/components/StorySection";
import PressSection from "@/components/PressSection";
import ArtistCinematic from "@/components/ArtistCinematic";
import VideoInterlude from "@/components/VideoInterlude";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";
import BookingWizard from "@/components/BookingWizard";
import FloatingParticles from "@/components/FloatingParticles";

import SectionTransition from "@/components/SectionTransition";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
// StudioConcierge REMOVED — replaced by ETHEREAL ChatEmbed widget (ethereal-chat.js in index.html)
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import LoadingScreen from "@/components/LoadingScreen";

// Conversion-focused components
import ExitIntentPopup from "@/components/ExitIntentPopup";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import StickyCTABar from "@/components/StickyCTABar";
import TrustBadges from "@/components/TrustBadges";
import NewsletterPopup from "@/components/NewsletterPopup";
import BookingCTASection from "@/components/BookingCTASection";

const Index = () => {
  const location = useLocation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleBookingClick = () => {
    // Open ETHEREAL chat widget instead of legacy booking wizard
    if (window.EtherealChat?.open) {
      window.EtherealChat.open();
    } else {
      // Fallback: if widget not loaded, open legacy booking
      setIsBookingOpen(true);
    }
  };
  const handleLoadingComplete = () => setIsLoading(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("book") === "1") {
      // Open ETHEREAL chat widget instead of legacy booking wizard
      // Widget exposes window.EtherealChat.open() via ethereal-chat.js
      const tryOpen = () => {
        if (window.EtherealChat?.open) {
          window.EtherealChat.open();
        } else {
          // Widget may not be loaded yet — retry briefly
          setTimeout(tryOpen, 500);
        }
      };
      setTimeout(tryOpen, 1000);
    }
  }, [location.search]);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <main className="min-h-screen bg-background relative overflow-x-hidden">
        
        <FloatingParticles />
        
        {/* Floating Elements */}
        <FloatingWhatsApp />
        {/* ETHEREAL ChatEmbed widget loaded via ethereal-chat.js in index.html */}
        <StickyCTABar onBookingClick={handleBookingClick} />
        <NewsletterPopup />
        <ExitIntentPopup onBookingClick={handleBookingClick} />
        
        <Navigation onBookingClick={handleBookingClick} />
        
        <Hero />
        
        {/* Trust Badges - Early social proof */}
        <TrustBadges />
        
        <SectionTransition>
          <PressSection />
        </SectionTransition>
        
        <VideoInterlude 
          variant="smoke" 
          quote="Every tattoo tells a story. Mine is about transformation." 
          author="Ferunda"
        />
        
        <SectionTransition>
          <Gallery />
        </SectionTransition>
        
        {/* Testimonials - Social proof after seeing work */}
        <SectionTransition>
          <Testimonials />
        </SectionTransition>
        
        <SectionTransition>
          <ArtistCinematic />
        </SectionTransition>
        
        <VideoInterlude 
          variant="rotating" 
          quote="I don't just create tattoos. I capture emotions in permanent form." 
          author="Ferunda"
        />
        
        <SectionTransition>
          <About />
        </SectionTransition>
        
        <SectionTransition>
          <StorySection />
        </SectionTransition>
        
        {/* Availability Calendar */}
        <SectionTransition>
          <AvailabilityCalendar />
        </SectionTransition>
        
        {/* FAQ Section - Address objections */}
        <SectionTransition>
          <FAQ />
        </SectionTransition>
        
        {/* Strong CTA before final sections */}
        <BookingCTASection onBookingClick={handleBookingClick} />
        
        <SectionTransition>
          <InstagramFeed />
        </SectionTransition>
        
        <Footer />
      </main>
      
      {/* Modals */}
      <BookingWizard isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export default Index;
