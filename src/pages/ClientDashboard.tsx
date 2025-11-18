import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Plus, Briefcase, Search } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACCOUNTING_SERVICES, CLIENT_TYPES, DURATION_TYPES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createJobOpen, setCreateJobOpen] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    service_type: "",
    budget_min: "",
    budget_max: "",
    duration: "",
    client_type: "",
  });

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

      if (profileData?.role !== "client") {
        navigate("/");
        return;
      }

      setProfile(profileData);

      const { data: jobsData } = await supabase
        .from("jobs")
        .select("*")
        .eq("client_id", userId)
        .order("created_at", { ascending: false });
      setJobs(jobsData || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async () => {
    if (!user) return;

    if (
      !jobData.title ||
      !jobData.description ||
      !jobData.service_type ||
      !jobData.duration ||
      !jobData.client_type
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const { error } = await supabase.from("jobs").insert([{
        client_id: user.id,
        title: jobData.title,
        description: jobData.description,
        service_type: jobData.service_type as any,
        budget_min: jobData.budget_min ? parseFloat(jobData.budget_min) : undefined,
        budget_max: jobData.budget_max ? parseFloat(jobData.budget_max) : undefined,
        duration: jobData.duration as any,
        client_type: jobData.client_type as any,
      }]);

      if (error) throw error;

      toast.success("Job posted successfully!");
      setCreateJobOpen(false);
      setJobData({
        title: "",
        description: "",
        service_type: "",
        budget_min: "",
        budget_max: "",
        duration: "",
        client_type: "",
      });
      await loadProfile(user.id);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Client Dashboard</h1>
          <p className="text-muted-foreground">
            Post jobs and find the perfect accounting freelancer
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* My Jobs Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    My Jobs
                  </CardTitle>
                  <CardDescription>Jobs you've posted</CardDescription>
                </div>
                <Dialog open={createJobOpen} onOpenChange={setCreateJobOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Post New Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Post a New Job</DialogTitle>
                      <DialogDescription>
                        Describe your accounting needs
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Job Title *</Label>
                        <Input
                          id="title"
                          value={jobData.title}
                          onChange={(e) =>
                            setJobData({ ...jobData, title: e.target.value })
                          }
                          placeholder="e.g., Need Bookkeeper for Small Business"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={jobData.description}
                          onChange={(e) =>
                            setJobData({ ...jobData, description: e.target.value })
                          }
                          placeholder="Describe what you need help with..."
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service_type">Service Type *</Label>
                        <Select
                          value={jobData.service_type}
                          onValueChange={(value) =>
                            setJobData({ ...jobData, service_type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            {ACCOUNTING_SERVICES.map((service) => (
                              <SelectItem key={service.value} value={service.value}>
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="budget_min">Min Budget ($)</Label>
                          <Input
                            id="budget_min"
                            type="number"
                            value={jobData.budget_min}
                            onChange={(e) =>
                              setJobData({ ...jobData, budget_min: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget_max">Max Budget ($)</Label>
                          <Input
                            id="budget_max"
                            type="number"
                            value={jobData.budget_max}
                            onChange={(e) =>
                              setJobData({ ...jobData, budget_max: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration *</Label>
                        <Select
                          value={jobData.duration}
                          onValueChange={(value) =>
                            setJobData({ ...jobData, duration: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {DURATION_TYPES.map((duration) => (
                              <SelectItem key={duration.value} value={duration.value}>
                                {duration.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client_type">Client Type *</Label>
                        <Select
                          value={jobData.client_type}
                          onValueChange={(value) =>
                            setJobData({ ...jobData, client_type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select client type" />
                          </SelectTrigger>
                          <SelectContent>
                            {CLIENT_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateJob}>Post Job</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {jobs.length > 0 ? (
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-lg">{job.title}</h4>
                          <Badge
                            variant={
                              job.status === "open"
                                ? "default"
                                : job.status === "in_progress"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {job.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">
                            {
                              ACCOUNTING_SERVICES.find(
                                (s) => s.value === job.service_type
                              )?.label
                            }
                          </Badge>
                          <Badge variant="outline">
                            {
                              DURATION_TYPES.find((d) => d.value === job.duration)
                                ?.label
                            }
                          </Badge>
                          {job.budget_min && job.budget_max && (
                            <Badge variant="outline">
                              ${job.budget_min} - ${job.budget_max}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      You haven't posted any jobs yet
                    </p>
                    <Button onClick={() => setCreateJobOpen(true)}>
                      Post Your First Job
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Freelancers
                </Button>
                <Button className="w-full" variant="outline">
                  <Briefcase className="h-4 w-4 mr-2" />
                  View All Jobs
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Jobs Posted</p>
                  <p className="text-2xl font-bold">{jobs.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                  <p className="text-2xl font-bold">
                    {jobs.filter((j) => j.status === "open").length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed Jobs</p>
                  <p className="text-2xl font-bold">
                    {jobs.filter((j) => j.status === "completed").length}
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

export default ClientDashboard;
