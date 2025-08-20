export interface Student {
  _id?: string;
  name: string;
  email: string;
  course: string;
  phone?: string;
  address?: string;
  enrollmentDate?: Date;
  status?: 'active' | 'inactive' | 'graduated';
  createdAt?: Date;
  updatedAt?: Date;
  formattedEnrollmentDate?: string;
}

export interface StudentResponse {
  success: boolean;
  data: Student;
  message?: string;
}

export interface StudentsResponse {
  success: boolean;
  data: Student[];
  count: number;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  errors?: any[];
}
