import Hero from "@/components/Hero";
import AppDescription from "@/components/AppDescription";
import QRSection from "@/components/QRSection";
import UserProgress from "@/components/UserProgress";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AppDescription />
      <QRSection />
      <UserProgress />
      <FinalCTA />
    </div>
  );
};

export default Index;