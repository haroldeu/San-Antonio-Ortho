export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          auth_id: string;
          email: string;
          role: 'admin' | 'super_admin';
          created_at: string;
          created_by_id: string | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          auth_id: string;
          email: string;
          role?: 'admin' | 'super_admin';
          created_at?: string;
          created_by_id?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          auth_id?: string;
          email?: string;
          role?: 'admin' | 'super_admin';
          created_at?: string;
          created_by_id?: string | null;
          is_active?: boolean;
        };
        Relationships: [];
      };
      appointment_requests: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          "service.id": string | null;
          preferred_date: string;
          preferred_time: string | null;
          notes: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          "service.id"?: string | null;
          preferred_date: string;
          preferred_time?: string | null;
          notes?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string;
          "service.id"?: string | null;
          preferred_date?: string;
          preferred_time?: string | null;
          notes?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointment_requests_service.id_fkey";
            columns: ["service.id"];
            referencedRelation: "service";
            referencedColumns: ["id"];
          },
        ];
      };
      contact_messages: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          status: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone?: string | null;
          message: string;
          status?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string;
          status?: string | null;
        };
        Relationships: [];
      };
      certificate_requests: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          date_of_birth: string;
          age: number;
          address: string;
          admin_fields: Json | null;
          pdf_url: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          date_of_birth: string;
          age: number;
          address: string;
          admin_fields?: Json | null;
          pdf_url?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          date_of_birth?: string;
          age?: number;
          address?: string;
          admin_fields?: Json | null;
          pdf_url?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      service: {
        Row: {
          id: string;
          created_at: string;
          update_at: string | null;
          name: string;
          slug: string;
          description: string | null;
          category: string;
          duration_min: number;
          duration_max: number;
          price_min: number;
          price_max: number;
          is_active: boolean;
          sort_order: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          update_at?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          category: string;
          duration_min: number;
          duration_max: number;
          price_min: number;
          price_max: number;
          is_active?: boolean;
          sort_order?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          update_at?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          category?: string;
          duration_min?: number;
          duration_max?: number;
          price_min?: number;
          price_max?: number;
          is_active?: boolean;
          sort_order?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
