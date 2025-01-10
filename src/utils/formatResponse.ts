import { Correction } from '@/types';

export const formatCorrection = (data: any): Correction => {
  return {
    original: data.original,
    corrected: data.corrected,
    errors: data.errors,
  };
};