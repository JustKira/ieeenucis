export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
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
      KaggleCompetitionLeaderboard: {
        Row: {
          competitionId: string
          completed: boolean
          id: number
          name: string
          reward: number
          rewardDescription: string
          token: string
          user: string
        }
        Insert: {
          competitionId: string
          completed?: boolean
          id?: number
          name: string
          reward?: number
          rewardDescription?: string
          token: string
          user: string
        }
        Update: {
          competitionId?: string
          completed?: boolean
          id?: number
          name?: string
          reward?: number
          rewardDescription?: string
          token?: string
          user?: string
        }
        Relationships: []
      }
      KaggleCompetitionRecord: {
        Row: {
          competitionId: string
          id: number
          record: Json
        }
        Insert: {
          competitionId: string
          id?: number
          record: Json
        }
        Update: {
          competitionId?: string
          id?: number
          record?: Json
        }
        Relationships: []
      }
      Notification: {
        Row: {
          description: string
          id: number
          title: string
        }
        Insert: {
          description: string
          id?: number
          title: string
        }
        Update: {
          description?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      Opportunity: {
        Row: {
          deadline: string
          description: string
          id: number
          title: string
        }
        Insert: {
          deadline: string
          description: string
          id?: number
          title: string
        }
        Update: {
          deadline?: string
          description?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      OpportunityRequest: {
        Row: {
          approved: boolean
          id: number
          opportunityId: number
          userId: number
        }
        Insert: {
          approved?: boolean
          id?: number
          opportunityId: number
          userId: number
        }
        Update: {
          approved?: boolean
          id?: number
          opportunityId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "OpportunityRequest_opportunityId_fkey"
            columns: ["opportunityId"]
            referencedRelation: "Opportunity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "OpportunityRequest_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      OpportunityTask: {
        Row: {
          id: number
          opportunityId: number
          taskId: number
        }
        Insert: {
          id?: number
          opportunityId: number
          taskId: number
        }
        Update: {
          id?: number
          opportunityId?: number
          taskId?: number
        }
        Relationships: [
          {
            foreignKeyName: "OpportunityTask_opportunityId_fkey"
            columns: ["opportunityId"]
            referencedRelation: "Opportunity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "OpportunityTask_taskId_fkey"
            columns: ["taskId"]
            referencedRelation: "Task"
            referencedColumns: ["id"]
          }
        ]
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
      ScoreHistory: {
        Row: {
          ammount: number
          date: string
          id: number
          issuerId: number | null
          reason: string | null
          receiverId: number
        }
        Insert: {
          ammount: number
          date: string
          id?: number
          issuerId?: number | null
          reason?: string | null
          receiverId: number
        }
        Update: {
          ammount?: number
          date?: string
          id?: number
          issuerId?: number | null
          reason?: string | null
          receiverId?: number
        }
        Relationships: [
          {
            foreignKeyName: "ScoreHistory_issuerId_fkey"
            columns: ["issuerId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ScoreHistory_receiverId_fkey"
            columns: ["receiverId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Tag: {
        Row: {
          color: string
          id: number
          name: string
        }
        Insert: {
          color: string
          id?: number
          name: string
        }
        Update: {
          color?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      Task: {
        Row: {
          allowUpload: boolean
          createdAt: string
          description: string
          dueDate: string
          dupped: boolean
          id: number
          issuerId: number
          points: number
          title: string
        }
        Insert: {
          allowUpload?: boolean
          createdAt: string
          description: string
          dueDate: string
          dupped?: boolean
          id?: number
          issuerId: number
          points?: number
          title: string
        }
        Update: {
          allowUpload?: boolean
          createdAt?: string
          description?: string
          dueDate?: string
          dupped?: boolean
          id?: number
          issuerId?: number
          points?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Task_issuerId_fkey"
            columns: ["issuerId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      TaskTag: {
        Row: {
          id: number
          tagId: number
          taskId: number
        }
        Insert: {
          id?: number
          tagId: number
          taskId: number
        }
        Update: {
          id?: number
          tagId?: number
          taskId?: number
        }
        Relationships: [
          {
            foreignKeyName: "TaskTag_tagId_fkey"
            columns: ["tagId"]
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "TaskTag_taskId_fkey"
            columns: ["taskId"]
            referencedRelation: "Task"
            referencedColumns: ["id"]
          }
        ]
      }
      UploadFile: {
        Row: {
          download: string
          fileName: string
          id: number
          type: string
        }
        Insert: {
          download: string
          fileName: string
          id?: number
          type: string
        }
        Update: {
          download?: string
          fileName?: string
          id?: number
          type?: string
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
      UserNotification: {
        Row: {
          id: number
          notificationId: number
          userId: number
        }
        Insert: {
          id?: number
          notificationId: number
          userId: number
        }
        Update: {
          id?: number
          notificationId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "UserNotification_notificationId_fkey"
            columns: ["notificationId"]
            referencedRelation: "Notification"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserNotification_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
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
      UserTask: {
        Row: {
          approved: boolean
          finished: boolean
          id: number
          taskId: number
          userId: number
        }
        Insert: {
          approved?: boolean
          finished?: boolean
          id?: number
          taskId: number
          userId: number
        }
        Update: {
          approved?: boolean
          finished?: boolean
          id?: number
          taskId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "UserTask_taskId_fkey"
            columns: ["taskId"]
            referencedRelation: "Task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserTask_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      UserTaskUploadFile: {
        Row: {
          id: number
          uploadFileId: number
          userTaskId: number
        }
        Insert: {
          id?: number
          uploadFileId: number
          userTaskId: number
        }
        Update: {
          id?: number
          uploadFileId?: number
          userTaskId?: number
        }
        Relationships: [
          {
            foreignKeyName: "UserTaskUploadFile_uploadFileId_fkey"
            columns: ["uploadFileId"]
            referencedRelation: "UploadFile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserTaskUploadFile_userTaskId_fkey"
            columns: ["userTaskId"]
            referencedRelation: "UserTask"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment: {
        Args: {
          x: number
          row_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  quizzy: {
    Tables: {
      Question: {
        Row: {
          id: number
          questionObject: Json
        }
        Insert: {
          id?: number
          questionObject: Json
        }
        Update: {
          id?: number
          questionObject?: Json
        }
        Relationships: []
      }
      QuestionsCollection: {
        Row: {
          collectionName: string
          id: number
        }
        Insert: {
          collectionName: string
          id?: number
        }
        Update: {
          collectionName?: string
          id?: number
        }
        Relationships: []
      }
      QuestionsCollectionQuestions: {
        Row: {
          id: number
          questionId: number
          questionsCollectionId: number
        }
        Insert: {
          id?: number
          questionId: number
          questionsCollectionId: number
        }
        Update: {
          id?: number
          questionId?: number
          questionsCollectionId?: number
        }
        Relationships: [
          {
            foreignKeyName: "QuestionsCollectionQuestions_questionId_fkey"
            columns: ["questionId"]
            referencedRelation: "Question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "QuestionsCollectionQuestions_questionsCollectionId_fkey"
            columns: ["questionsCollectionId"]
            referencedRelation: "QuestionsCollection"
            referencedColumns: ["id"]
          }
        ]
      }
      Quiz: {
        Row: {
          id: number
          quizName: string
          totalMarks: number
        }
        Insert: {
          id?: number
          quizName: string
          totalMarks?: number
        }
        Update: {
          id?: number
          quizName?: string
          totalMarks?: number
        }
        Relationships: []
      }
      QuizQuestions: {
        Row: {
          id: number
          questionId: number
          quizId: number
        }
        Insert: {
          id?: number
          questionId: number
          quizId: number
        }
        Update: {
          id?: number
          questionId?: number
          quizId?: number
        }
        Relationships: [
          {
            foreignKeyName: "QuizQuestions_questionId_fkey"
            columns: ["questionId"]
            referencedRelation: "Question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "QuizQuestions_quizId_fkey"
            columns: ["quizId"]
            referencedRelation: "Quiz"
            referencedColumns: ["id"]
          }
        ]
      }
      QuizSchedule: {
        Row: {
          code: string
          duration: number
          id: number
          name: string
          quizId: number
          startDate: string
        }
        Insert: {
          code: string
          duration: number
          id?: number
          name?: string
          quizId: number
          startDate: string
        }
        Update: {
          code?: string
          duration?: number
          id?: number
          name?: string
          quizId?: number
          startDate?: string
        }
        Relationships: [
          {
            foreignKeyName: "QuizSchedule_quizId_fkey"
            columns: ["quizId"]
            referencedRelation: "Quiz"
            referencedColumns: ["id"]
          }
        ]
      }
      QuizScheduleAnalytics: {
        Row: {
          analytics: Json
          id: number
          quizScheduleId: number
        }
        Insert: {
          analytics: Json
          id?: number
          quizScheduleId: number
        }
        Update: {
          analytics?: Json
          id?: number
          quizScheduleId?: number
        }
        Relationships: [
          {
            foreignKeyName: "QuizScheduleAnalytics_quizScheduleId_fkey"
            columns: ["quizScheduleId"]
            referencedRelation: "QuizSchedule"
            referencedColumns: ["id"]
          }
        ]
      }
      UserQuiz: {
        Row: {
          answers: Json
          attended: boolean
          attendedAt: string | null
          autoGrade: number
          id: number
          manualGrade: number
          quizId: number
          quizScheduleId: number
          submitted: boolean
          userId: number
        }
        Insert: {
          answers: Json
          attended: boolean
          attendedAt?: string | null
          autoGrade: number
          id?: number
          manualGrade: number
          quizId: number
          quizScheduleId: number
          submitted?: boolean
          userId: number
        }
        Update: {
          answers?: Json
          attended?: boolean
          attendedAt?: string | null
          autoGrade?: number
          id?: number
          manualGrade?: number
          quizId?: number
          quizScheduleId?: number
          submitted?: boolean
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "UserQuiz_quizId_fkey"
            columns: ["quizId"]
            referencedRelation: "Quiz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserQuiz_quizScheduleId_fkey"
            columns: ["quizScheduleId"]
            referencedRelation: "QuizSchedule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "UserQuiz_userId_fkey"
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
      QuestionTypes: "MSQ" | "TF" | "CODE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
