
export interface MapMetric {
  id: string;
  title: string;
  value: string | null;
  change: number | null;
  icon: React.ReactNode;
}

export interface MapAnalysisProps {
  formData: any;
  updateFormData: (key: string, value: any) => void;
}
