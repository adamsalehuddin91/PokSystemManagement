import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsBar } from "@/components/StatsBar";
import { EcosystemSection } from "@/components/EcosystemSection";
import { WhySwiftApps } from "@/components/WhySwiftApps";
import { PricingSection } from "@/components/PricingSection";
import { HowItWorks } from "@/components/HowItWorks";
import { CtaSection } from "@/components/CtaSection";
import { ContactSection } from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <StatsBar />
            <EcosystemSection />
            <WhySwiftApps />
            <PricingSection />
            <HowItWorks />
            <CtaSection />
            <ContactSection />
            <FooterSection />
        </>
    );
}
