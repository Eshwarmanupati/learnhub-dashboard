/** Database row types matching the Supabase schema */
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

/** Supabase Database type definition */
export interface Database {
  public: {
    Tables: {
      courses: {
        Row: Course;
        Insert: Omit<Course, 'id' | 'created_at'>;
        Update: Partial<Omit<Course, 'id'>>;
      };
    };
  };
}

/** Navigation item for the sidebar */
export interface NavItem {
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}

/** Activity data for the contribution chart */
export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/** Weekly activity data grouping */
export interface ActivityWeek {
  days: ActivityDay[];
}
