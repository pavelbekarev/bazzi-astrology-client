import { FormField } from "../interfaces/formFieldsConstants";

export type FormManagerConfig = {
  method?: string;
  apiEndPoint?: string;
  info: {
    entries: FormField[];
  };
};
