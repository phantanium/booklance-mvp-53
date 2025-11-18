import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Briefcase, Building } from "lucide-react";
import { User } from "@supabase/supabase-js";

const Onboarding = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth/login");
        return;
      }
      setUser(session.user);

      // Check if user already has a role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role) {
        navigate(`/dashboard/${profile.role}`);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleRoleSelection = async (role: "client" | "freelancer") => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role })
        .eq("id", user.id);

      if (error) throw error;

      toast.success(`Welcome! You're now a ${role}`);
      navigate(`/dashboard/${role}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to set role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Path</h1>
          <p className="text-muted-foreground text-lg">
            How would you like to use Booklance?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">I'm a Freelancer</CardTitle>
              <CardDescription className="text-center">
                Showcase your accounting expertise and find clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li>• Build your professional portfolio</li>
                <li>• Browse accounting job opportunities</li>
                <li>• Set your own rates and schedule</li>
                <li>• Grow your reputation with client reviews</li>
              </ul>
              <Button
                className="w-full"
                onClick={() => handleRoleSelection("freelancer")}
                disabled={loading}
              >
                Continue as Freelancer
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary">
            <CardHeader>
              <div className="mb-4 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">I'm a Client</CardTitle>
              <CardDescription className="text-center">
                Find qualified accounting professionals for your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li>• Post your accounting job requirements</li>
                <li>• Browse certified freelancer profiles</li>
                <li>• Filter by service type and experience</li>
                <li>• Review portfolios and ratings</li>
              </ul>
              <Button
                className="w-full"
                onClick={() => handleRoleSelection("client")}
                disabled={loading}
              >
                Continue as Client
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
