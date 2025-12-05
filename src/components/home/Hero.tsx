import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A4E42' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <p className="text-secondary font-semibold tracking-wider uppercase text-sm">
                Premium Islamic Headwear
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                Elevate Your{" "}
                <span className="text-primary">Faith</span>{" "}
                <br className="hidden md:block" />
                With Style
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Discover our exquisite collection of handcrafted Islamic caps. 
                Each piece is designed to honor tradition while embracing modern elegance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold group">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/shop?filter=new">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-6 text-base font-semibold"
                >
                  New Arrivals
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-serif font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Unique Designs</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Quality Assured</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-secondary" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10" />
              
              {/* Main image */}
              <div className="relative z-10 aspect-square overflow-hidden shadow-2xl">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1678559460700-8a1d42ce8239?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Premium Islamic Cap"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
