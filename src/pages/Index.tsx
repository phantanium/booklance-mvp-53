import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Briefcase, Search, TrendingUp, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Find Expert Accounting Freelancers
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect businesses with specialized accounting professionals. Get your finances in order with Booklance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/auth/login")}
              className="gap-2"
            >
              Get Started as Freelancer
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth/login")}
            >
              Hire a Freelancer
            </Button>
          </div>
        </div>
      </section>

      {/* For Freelancers */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              For Accounting Freelancers
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Showcase your expertise and connect with businesses that need your skills
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border">
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Build Your Portfolio</h3>
                <p className="text-muted-foreground">
                  Showcase your accounting projects and certifications
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <Search className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Find Opportunities</h3>
                <p className="text-muted-foreground">
                  Browse jobs that match your specialization
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Grow Your Career</h3>
                <p className="text-muted-foreground">
                  Build reputation with client reviews and ratings
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Clients */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              For UMKM & Companies
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Find the perfect accounting professional for your business needs
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Vetted Professionals</h3>
                <p className="text-muted-foreground">
                  Access certified accounting experts with proven track records
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <Search className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
                <p className="text-muted-foreground">
                  Filter by service type, experience, and budget
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Post Jobs</h3>
                <p className="text-muted-foreground">
                  Describe your needs and receive proposals from qualified freelancers
                </p>
              </div>
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
