import { Header } from "@/features/landing/components/Header";
import { Hero } from "@/features/landing/components/Hero";
import { Occasions } from "@/features/landing/components/Occasions";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { CtaBand } from "@/features/landing/components/CtaBand";
import { Footer } from "@/features/landing/components/Footer";

export const metadata = {
  title: "Wishlet - Send an experience",
  description:
    "Create beautiful, personalized, animated web pages for the people you care about. Ready in seconds, remembered forever.",
};

export default function Home(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-ground">
      <Header />
      <main className="flex-1">
        <Hero />
        <Occasions />
        <HowItWorks />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
