import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Analytics } from "@/components/sections/Analytics";
import { ContentCalendar } from "@/components/sections/ContentCalendar";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Generator } from "@/components/sections/Generator";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PlatformStrip } from "@/components/sections/PlatformStrip";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <PlatformStrip />
        <Generator />
        <Features />
        <HowItWorks />
        <Analytics />
        <ContentCalendar />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
