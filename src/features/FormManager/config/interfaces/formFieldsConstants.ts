export interface FormField {
  name: string;
  nameRus: string;
  type: "text" | "email" | "number" | "select" | "checkbox" | "textarea";
  placeholder?: string;
  options?: string[];
}
