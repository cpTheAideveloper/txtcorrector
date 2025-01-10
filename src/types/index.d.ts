export interface Correction {
    original: string;
    corrected: string;
    errors: {
      sentence: string;
      rules: string[];
    }[];
  }