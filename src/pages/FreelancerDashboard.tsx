import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Plus, Edit, Briefcase, Award, Target } from "lucide-react";
import { ACCOUNTING_SERVICES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    headline: "",
    bio: "",
    country: "",
    hourly_rate: "",
    project_rate: "",
    years_experience: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth/login");
      return;
    }

    setUser(session.user);
    await loadProfile(session.user.id);
  };

  const loadProfile = async (userId: string) => {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileData?.role !== "freelancer") {
        navigate("/");
        return;
      }

      setProfile(profileData);
      setEditData({
        headline: profileData.headline || "",
        bio: profileData.bio || "",
        country: profileData.country || "",
        hourly_rate: profileData.hourly_rate?.toString() || "",
        project_rate: profileData.project_rate?.toString() || "",
        years_experience: profileData.years_experience?.toString() || "",
      });

      const { data: servicesData } = await supabase
        .from("freelancer_services")
        .select("*")
        .eq("freelancer_id", userId);
      setServices(servicesData || []);
      setSelectedServices(servicesData?.map((s) => s.service) || []);

      const { data: skillsData } = await supabase
        .from("freelancer_skills")
        .select("*")
        .eq("freelancer_id", userId);
      setSkills(skillsData || []);

      const { data: certsData } = await supabase
        .from("freelancer_certifications")
        .select("*")
        .eq("freelancer_id", userId);
      setCertifications(certsData || []);

      const { data: portfolioData } = await supabase
        .from("portfolios")
        .select("*")
        .eq("freelancer_id", userId)
        .order("created_at", { ascending: false });
      setPortfolios(portfolioData || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          headline: editData.headline,
          bio: editData.bio,
          country: editData.country,
          hourly_rate: editData.hourly_rate ? parseFloat(editData.hourly_rate) : null,
          project_rate: editData.project_rate ? parseFloat(editData.project_rate) : null,
          years_experience: editData.years_experience ? parseInt(editData.years_experience) : null,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Update services
      await supabase
        .from("freelancer_services")
        .delete()
        .eq("freelancer_id", user.id);

      if (selectedServices.length > 0) {
        const servicesInsert = selectedServices.map((service) => ({
          freelancer_id: user.id,
          service: service as any,
        }));
        await supabase.from("freelancer_services").insert(servicesInsert);
      }

      toast.success("Profile updated successfully!");
      setEditDialogOpen(false);
      await loadProfile(user.id);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  if (loading) {
    return <div className="min-h-screen bg-background">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Freelancer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your profile and showcase your expertise
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Your professional information</CardDescription>
                </div>
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Update your professional information
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="headline">Headline</Label>
                        <Input
                          id="headline"
                          value={editData.headline}
                          onChange={(e) =>
                            setEditData({ ...editData, headline: e.target.value })
                          }
                          placeholder="e.g., Certified Public Accountant"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editData.bio}
                          onChange={(e) =>
                            setEditData({ ...editData, bio: e.target.value })
                          }
                          placeholder="Tell clients about yourself..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={editData.country}
                          onChange={(e) =>
                            setEditData({ ...editData, country: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                          <Input
                            id="hourly_rate"
                            type="number"
                            value={editData.hourly_rate}
                            onChange={(e) =>
                              setEditData({ ...editData, hourly_rate: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="project_rate">Project Rate ($)</Label>
                          <Input
                            id="project_rate"
                            type="number"
                            value={editData.project_rate}
                            onChange={(e) =>
                              setEditData({ ...editData, project_rate: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="years_experience">Years of Experience</Label>
                        <Input
                          id="years_experience"
                          type="number"
                          value={editData.years_experience}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              years_experience: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Services Offered</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                          {ACCOUNTING_SERVICES.map((service) => (
                            <div key={service.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={service.value}
                                checked={selectedServices.includes(service.value)}
                                onCheckedChange={() => toggleService(service.value)}
                              />
                              <label
                                htmlFor={service.value}
                                className="text-sm cursor-pointer"
                              >
                                {service.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {profile?.headline || "Add your headline"}
                  </h3>
                  <p className="text-muted-foreground">{profile?.email}</p>
                </div>
                {profile?.bio && (
                  <div>
                    <p className="text-sm">{profile.bio}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-4 text-sm">
                  {profile?.country && (
                    <span className="text-muted-foreground">📍 {profile.country}</span>
                  )}
                  {profile?.years_experience && (
                    <span className="text-muted-foreground">
                      🎓 {profile.years_experience} years
                    </span>
                  )}
                  {profile?.hourly_rate && (
                    <span className="text-muted-foreground">
                      💵 ${profile.hourly_rate}/hour
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  My Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                {services.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <Badge key={service.id} variant="secondary">
                        {
                          ACCOUNTING_SERVICES.find((s) => s.value === service.service)
                            ?.label
                        }
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Add services to your profile to attract clients
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Portfolio Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Portfolio
                  </CardTitle>
                  <CardDescription>Showcase your best work</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </CardHeader>
              <CardContent>
                {portfolios.length > 0 ? (
                  <div className="space-y-4">
                    {portfolios.map((portfolio) => (
                      <div
                        key={portfolio.id}
                        className="border rounded-lg p-4 hover:bg-muted/50"
                      >
                        <h4 className="font-semibold mb-2">{portfolio.project_name}</h4>
                        <div className="flex gap-2 mb-2">
                          <Badge variant="outline">{portfolio.client_type}</Badge>
                          <Badge variant="outline">
                            {
                              ACCOUNTING_SERVICES.find(
                                (s) => s.value === portfolio.service_type
                              )?.label
                            }
                          </Badge>
                        </div>
                        {portfolio.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {portfolio.description}
                          </p>
                        )}
                        {portfolio.impact && (
                          <p className="text-sm">
                            <strong>Impact:</strong> {portfolio.impact}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Add your projects to showcase your experience
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio Projects</p>
                  <p className="text-2xl font-bold">{portfolios.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Services Offered</p>
                  <p className="text-2xl font-bold">{services.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profile Completeness</p>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      ((profile?.headline ? 20 : 0) +
                        (profile?.bio ? 20 : 0) +
                        (services.length > 0 ? 20 : 0) +
                        (portfolios.length > 0 ? 20 : 0) +
                        (profile?.country ? 20 : 0))
                    )}
                    %
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
