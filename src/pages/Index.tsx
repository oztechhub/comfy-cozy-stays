import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ApartmentListings from "@/components/ApartmentListings";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ApartmentListings />
      <Footer />
    </div>
  );
};

export default Index;
