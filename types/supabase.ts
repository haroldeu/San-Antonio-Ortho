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
          }
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
