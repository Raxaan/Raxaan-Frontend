import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Collections from "@/components/home/Collections";
import NewArrivals from "@/components/home/NewArrivals";
import Features from "@/components/home/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Collections />
        <NewArrivals />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
