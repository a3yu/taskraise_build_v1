export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activities: {
        Row: {
          action: string | null
          created_at: string
          customer: string
          id: number
          orderId: number
          organization: number
          total: number
        }
        Insert: {
          action?: string | null
          created_at?: string
          customer: string
          id?: number
          orderId: number
          organization: number
          total: number
        }
        Update: {
          action?: string | null
          created_at?: string
          customer?: string
          id?: number
          orderId?: number
          organization?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_activities_customer_fkey"
            columns: ["customer"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_activities_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "service_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_activities_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          created_at: string
          description: string
          goal: number
          id: number
          raised: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string
          goal: number
          id?: number
          raised: number
          title?: string
        }
        Update: {
          created_at?: string
          description?: string
          goal?: number
          id?: number
          raised?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_campaigns_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      invitations: {
        Row: {
          accepted: boolean
          created_at: string
          email: string
          expires_at: string
          id: number
          organization: number
          profile: string
          token: string
        }
        Insert: {
          accepted?: boolean
          created_at?: string
          email: string
          expires_at: string
          id?: number
          organization: number
          profile: string
          token: string
        }
        Update: {
          accepted?: boolean
          created_at?: string
          email?: string
          expires_at?: string
          id?: number
          organization?: number
          profile?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_invitation_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_invitations_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          created_at: string
          id: number
          org_role: Database["public"]["Enums"]["org_role"]
          profile: string
        }
        Insert: {
          created_at?: string
          id?: number
          org_role?: Database["public"]["Enums"]["org_role"]
          profile: string
        }
        Update: {
          created_at?: string
          id?: number
          org_role?: Database["public"]["Enums"]["org_role"]
          profile?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_organization_members_id_fkey"
            columns: ["id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_organization_members_profile_fkey"
            columns: ["profile"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: number
          location: string
          name: string
          pfp_path: string
        }
        Insert: {
          created_at?: string
          id?: number
          location?: string
          name?: string
          pfp_path?: string
        }
        Update: {
          created_at?: string
          id?: number
          location?: string
          name?: string
          pfp_path?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      request_offers: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      service_orders: {
        Row: {
          completed_at: string | null
          created_at: string
          customer: string
          details: string | null
          id: number
          organization: number
          price: number
          quantity: number | null
          service: number
          status: Database["public"]["Enums"]["service_order_status"]
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          customer: string
          details?: string | null
          id?: number
          organization: number
          price: number
          quantity?: number | null
          service: number
          status?: Database["public"]["Enums"]["service_order_status"]
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          customer?: string
          details?: string | null
          id?: number
          organization?: number
          price?: number
          quantity?: number | null
          service?: number
          status?: Database["public"]["Enums"]["service_order_status"]
        }
        Relationships: [
          {
            foreignKeyName: "public_service_orders_customer_fkey"
            columns: ["customer"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_service_orders_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_service_orders_service_fkey"
            columns: ["service"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          id: number
          inactive: boolean | null
          location: string | null
          location_geo: unknown | null
          order_details: string
          orders: number
          organization: number
          price: number
          service_details: string
          service_type: string
          thumbnail_path: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: number
          inactive?: boolean | null
          location?: string | null
          location_geo?: unknown | null
          order_details?: string
          orders?: number
          organization: number
          price?: number
          service_details?: string
          service_type?: string
          thumbnail_path?: string
          title?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          inactive?: boolean | null
          location?: string | null
          location_geo?: unknown | null
          order_details?: string
          orders?: number
          organization?: number
          price?: number
          service_details?: string
          service_type?: string
          thumbnail_path?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_services_organization_fkey"
            columns: ["organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_member_to_organization: {
        Args: {
          org_id: string
          new_member_profile: string
          new_member_role: string
        }
        Returns: undefined
      }
      search_nearby_services: {
        Args: {
          product_title: string
          lat: number
          long: number
          dist_meters: number
        }
        Returns: {
          created_at: string
          description: string
          id: number
          inactive: boolean | null
          location: string | null
          location_geo: unknown | null
          order_details: string
          orders: number
          organization: number
          price: number
          service_details: string
          service_type: string
          thumbnail_path: string
          title: string
        }[]
      }
      search_remote_services: {
        Args: {
          product_title: string
        }
        Returns: {
          created_at: string
          description: string
          id: number
          inactive: boolean | null
          location: string | null
          location_geo: unknown | null
          order_details: string
          orders: number
          organization: number
          price: number
          service_details: string
          service_type: string
          thumbnail_path: string
          title: string
        }[]
      }
      search_services: {
        Args: {
          product_title: string
        }
        Returns: {
          created_at: string
          description: string
          id: number
          inactive: boolean | null
          location: string | null
          location_geo: unknown | null
          order_details: string
          orders: number
          organization: number
          price: number
          service_details: string
          service_type: string
          thumbnail_path: string
          title: string
        }[]
      }
    }
    Enums: {
      org_role: "OWNER" | "ADMIN" | "MEMBER"
      service_order_status: "INCOMING" | "REJECTED" | "ONGOING" | "COMPLETED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
