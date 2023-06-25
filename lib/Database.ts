export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Role: {
        Row: {
          id: number
          name: string
          permissions: string[] | null
        }
        Insert: {
          id?: number
          name: string
          permissions?: string[] | null
        }
        Update: {
          id?: number
          name?: string
          permissions?: string[] | null
        }
        Relationships: []
      }
      User: {
        Row: {
          email: string
          firstname: string
          id: number
          lastname: string
          phonenumber: string
          score: number
          uid: string
        }
        Insert: {
          email: string
          firstname: string
          id?: number
          lastname: string
          phonenumber: string
          score?: number
          uid: string
        }
        Update: {
          email?: string
          firstname?: string
          id?: number
          lastname?: string
          phonenumber?: string
          score?: number
          uid?: string
        }
        Relationships: []
      }
      UserRole: {
        Row: {
          id: number
          roleId: number
          userId: number
        }
        Insert: {
          id?: number
          roleId: number
          userId: number
        }
        Update: {
          id?: number
          roleId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "UserRole_roleId_fkey"
            columns: ["roleId"]
            referencedRelation: "Role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserRole_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
