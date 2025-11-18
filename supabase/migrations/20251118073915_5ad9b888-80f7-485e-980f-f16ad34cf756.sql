-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('client', 'freelancer');

-- Create enum for accounting service types
CREATE TYPE public.accounting_service AS ENUM (
  'financial_accountant',
  'tax_accountant',
  'bookkeeper',
  'management_accountant',
  'cost_accountant',
  'auditor',
  'accounting_software_specialist',
  'accounting_consultant',
  'financial_analyst',
  'accounting_trainer',
  'payroll_specialist',
  'accounting_data_entry',
  'accounting_assistant'
);

-- Create enum for client types
CREATE TYPE public.client_type AS ENUM ('umkm', 'corporate');

-- Create enum for job duration types
CREATE TYPE public.duration_type AS ENUM ('once_off', 'monthly', 'project_based');

-- Create enum for job status
CREATE TYPE public.job_status AS ENUM ('open', 'in_progress', 'completed');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role,
  headline TEXT,
  bio TEXT,
  country TEXT,
  hourly_rate DECIMAL(10, 2),
  project_rate DECIMAL(10, 2),
  years_experience INTEGER,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create freelancer_services table (many-to-many relationship)
CREATE TABLE public.freelancer_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  service accounting_service NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(freelancer_id, service)
);

-- Create freelancer_skills table
CREATE TABLE public.freelancer_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create freelancer_certifications table
CREATE TABLE public.freelancer_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  certification TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create portfolio table
CREATE TABLE public.portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  client_type client_type NOT NULL,
  service_type accounting_service NOT NULL,
  description TEXT,
  impact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  service_type accounting_service NOT NULL,
  budget_min DECIMAL(10, 2),
  budget_max DECIMAL(10, 2),
  duration duration_type NOT NULL,
  client_type client_type NOT NULL,
  status job_status DEFAULT 'open',
  assigned_freelancer_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ratings table
CREATE TABLE public.ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, freelancer_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelancer_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelancer_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.freelancer_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for freelancer_services
CREATE POLICY "Services viewable by everyone" ON public.freelancer_services FOR SELECT USING (true);
CREATE POLICY "Freelancers can manage own services" ON public.freelancer_services FOR ALL USING (auth.uid() = freelancer_id);

-- RLS Policies for freelancer_skills
CREATE POLICY "Skills viewable by everyone" ON public.freelancer_skills FOR SELECT USING (true);
CREATE POLICY "Freelancers can manage own skills" ON public.freelancer_skills FOR ALL USING (auth.uid() = freelancer_id);

-- RLS Policies for freelancer_certifications
CREATE POLICY "Certifications viewable by everyone" ON public.freelancer_certifications FOR SELECT USING (true);
CREATE POLICY "Freelancers can manage own certifications" ON public.freelancer_certifications FOR ALL USING (auth.uid() = freelancer_id);

-- RLS Policies for portfolios
CREATE POLICY "Portfolios viewable by everyone" ON public.portfolios FOR SELECT USING (true);
CREATE POLICY "Freelancers can manage own portfolios" ON public.portfolios FOR ALL USING (auth.uid() = freelancer_id);

-- RLS Policies for jobs
CREATE POLICY "Jobs viewable by everyone" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Clients can create jobs" ON public.jobs FOR INSERT WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Clients can update own jobs" ON public.jobs FOR UPDATE USING (auth.uid() = client_id);
CREATE POLICY "Clients can delete own jobs" ON public.jobs FOR DELETE USING (auth.uid() = client_id);

-- RLS Policies for ratings
CREATE POLICY "Ratings viewable by everyone" ON public.ratings FOR SELECT USING (true);
CREATE POLICY "Clients can create ratings for their jobs" ON public.ratings FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON public.portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at();