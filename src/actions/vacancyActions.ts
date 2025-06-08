import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axios';

export interface VacancyRequest {
  name: string;
  from_date: string;
  to_date: string;
  sources: string[];
  requirements?: string;
  experience?: string;
  company_name?: string;
  work_format?: string;
  salary_frequency?: string;
  locality?: string;
  education?: string;
}

interface VacancyError {
  response?: {
    data?: {
      detail?: string | Array<{ msg: string }>;
    };
  };
  message: string;
}

const formatError = (error: VacancyError): string => {
  if (error.response?.data?.detail) {
    if (Array.isArray(error.response.data.detail)) {
      return error.response.data.detail.map((err) => err.msg).join(', ');
    }
    return error.response.data.detail;
  }
  return error.message;
};

export const submitVacancy = createAsyncThunk(
  'vacancy/submit',
  async (vacancyData: VacancyRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('https://pay-pulse-backend.where-pizza.ru/api/vacancies', vacancyData);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(formatError(error as VacancyError));
    }
  },
);
