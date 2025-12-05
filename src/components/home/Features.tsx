import { Truck, Shield, Award, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Finest materials and expert stitching in every piece",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping across Pakistan",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "Safe payment options with buyer protection",
  },
  {
    icon: HeartHandshake,
    title: "Customer Support",
    description: "Dedicated help for all your queries",
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-secondary font-semibold tracking-wider uppercase text-sm mb-2">
            Our Promise
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Why Choose Raxan
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-foreground/10 flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-serif font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
