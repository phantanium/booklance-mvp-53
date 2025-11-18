export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      freelancer_certifications: {
        Row: {
          certification: string
          created_at: string | null
          freelancer_id: string
          id: string
        }
        Insert: {
          certification: string
          created_at?: string | null
          freelancer_id: string
          id?: string
        }
        Update: {
          certification?: string
          created_at?: string | null
          freelancer_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_certifications_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancer_services: {
        Row: {
          created_at: string | null
          freelancer_id: string
          id: string
          service: Database["public"]["Enums"]["accounting_service"]
        }
        Insert: {
          created_at?: string | null
          freelancer_id: string
          id?: string
          service: Database["public"]["Enums"]["accounting_service"]
        }
        Update: {
          created_at?: string | null
          freelancer_id?: string
          id?: string
          service?: Database["public"]["Enums"]["accounting_service"]
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_services_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancer_skills: {
        Row: {
          created_at: string | null
          freelancer_id: string
          id: string
          skill: string
        }
        Insert: {
          created_at?: string | null
          freelancer_id: string
          id?: string
          skill: string
        }
        Update: {
          created_at?: string | null
          freelancer_id?: string
          id?: string
          skill?: string
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_skills_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          assigned_freelancer_id: string | null
          budget_max: number | null
          budget_min: number | null
          client_id: string
          client_type: Database["public"]["Enums"]["client_type"]
          created_at: string | null
          description: string
          duration: Database["public"]["Enums"]["duration_type"]
          id: string
          service_type: Database["public"]["Enums"]["accounting_service"]
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_freelancer_id?: string | null
          budget_max?: number | null
          budget_min?: number | null
          client_id: string
          client_type: Database["public"]["Enums"]["client_type"]
          created_at?: string | null
          description: string
          duration: Database["public"]["Enums"]["duration_type"]
          id?: string
          service_type: Database["public"]["Enums"]["accounting_service"]
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_freelancer_id?: string | null
          budget_max?: number | null
          budget_min?: number | null
          client_id?: string
          client_type?: Database["public"]["Enums"]["client_type"]
          created_at?: string | null
          description?: string
          duration?: Database["public"]["Enums"]["duration_type"]
          id?: string
          service_type?: Database["public"]["Enums"]["accounting_service"]
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_assigned_freelancer_id_fkey"
            columns: ["assigned_freelancer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolios: {
        Row: {
          client_type: Database["public"]["Enums"]["client_type"]
          created_at: string | null
          description: string | null
          freelancer_id: string
          id: string
          impact: string | null
          project_name: string
          service_type: Database["public"]["Enums"]["accounting_service"]
          updated_at: string | null
        }
        Insert: {
          client_type: Database["public"]["Enums"]["client_type"]
          created_at?: string | null
          description?: string | null
          freelancer_id: string
          id?: string
          impact?: string | null
          project_name: string
          service_type: Database["public"]["Enums"]["accounting_service"]
          updated_at?: string | null
        }
        Update: {
          client_type?: Database["public"]["Enums"]["client_type"]
          created_at?: string | null
          description?: string | null
          freelancer_id?: string
          id?: string
          impact?: string | null
          project_name?: string
          service_type?: Database["public"]["Enums"]["accounting_service"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolios_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country: string | null
          created_at: string | null
          email: string
          full_name: string | null
          headline: string | null
          hourly_rate: number | null
          id: string
          project_rate: number | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          headline?: string | null
          hourly_rate?: number | null
          id: string
          project_rate?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          headline?: string | null
          hourly_rate?: number | null
          id?: string
          project_rate?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          client_id: string
          created_at: string | null
          freelancer_id: string
          id: string
          job_id: string
          rating: number
          review: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          freelancer_id: string
          id?: string
          job_id: string
          rating: number
          review?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          freelancer_id?: string
          id?: string
          job_id?: string
          rating?: number
          review?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_freelancer_id_fkey"
            columns: ["freelancer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      accounting_service:
        | "financial_accountant"
        | "tax_accountant"
        | "bookkeeper"
        | "management_accountant"
        | "cost_accountant"
        | "auditor"
        | "accounting_software_specialist"
        | "accounting_consultant"
        | "financial_analyst"
        | "accounting_trainer"
        | "payroll_specialist"
        | "accounting_data_entry"
        | "accounting_assistant"
      client_type: "umkm" | "corporate"
      duration_type: "once_off" | "monthly" | "project_based"
      job_status: "open" | "in_progress" | "completed"
      user_role: "client" | "freelancer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      accounting_service: [
        "financial_accountant",
        "tax_accountant",
        "bookkeeper",
        "management_accountant",
        "cost_accountant",
        "auditor",
        "accounting_software_specialist",
        "accounting_consultant",
        "financial_analyst",
        "accounting_trainer",
        "payroll_specialist",
        "accounting_data_entry",
        "accounting_assistant",
      ],
      client_type: ["umkm", "corporate"],
      duration_type: ["once_off", "monthly", "project_based"],
      job_status: ["open", "in_progress", "completed"],
      user_role: ["client", "freelancer"],
    },
  },
} as const
