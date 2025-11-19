import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Building2, Users, Search, Star } from "lucide-react";
import { dummyServices } from "@/lib/dummyData";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find the Perfect{" "}
            <span className="text-primary">Accounting Freelancer</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with certified accounting professionals for all your financial needs
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-2 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder='Try "bookkeeping" or "tax preparation"'
                className="pl-10 h-12"
              />
            </div>
            <Button size="lg" onClick={() => navigate("/services")}>
              Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-muted-foreground">Popular:</span>
            <Button variant="link" className="h-auto p-0 text-sm">
              Bookkeeping
            </Button>
            <Button variant="link" className="h-auto p-0 text-sm">
              Tax Preparation
            </Button>
            <Button variant="link" className="h-auto p-0 text-sm">
              Financial Analysis
            </Button>
            <Button variant="link" className="h-auto p-0 text-sm">
              Payroll
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Accounting Services</h2>
              <p className="text-muted-foreground">
                Browse top-rated services from expert accounting freelancers
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate("/services")}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyServices.slice(0, 8).map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* For Freelancers Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                For Accounting Freelancers
              </h2>
              <p className="text-muted-foreground mb-6">
                Join Booklance and connect with clients looking for your expertise in bookkeeping, tax, audit, and more.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Showcase your portfolio and certifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Set your own rates and schedule</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Build long-term client relationships</span>
                </li>
              </ul>
              <Button size="lg" onClick={() => navigate("/auth/login")}>
                Start as Freelancer
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8 aspect-square flex items-center justify-center">
              <Users className="h-32 w-32 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* For Clients Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8 aspect-square flex items-center justify-center order-2 md:order-1">
              <Building2 className="h-32 w-32 text-primary" />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4">
                For UMKM & Corporations
              </h2>
              <p className="text-muted-foreground mb-6">
                Find qualified accounting professionals for your business needs - from basic bookkeeping to complex financial analysis.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Browse verified accounting specialists</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Compare portfolios and ratings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Hire with confidence and flexibility</span>
                </li>
              </ul>
              <Button size="lg" onClick={() => navigate("/auth/login")}>
                Start as Client
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join Booklance today and transform how you work with accounting professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/auth/login")}
            >
              Start as Freelancer
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth/login")}
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              Start as Client
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
