export interface FormField {
  name: string;
  nameRus: string;
  label: string;
  type: "text" | "email" | "number" | "select" | "checkbox" | "textarea";
  placeholder?: string;
  options?: string[];
}
