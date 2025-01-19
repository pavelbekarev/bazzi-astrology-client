import { Entries } from "../interfaces/Entries";

export type FormManagerConfig = {
  method: string;
  apiEndPoint: string;
  info: {
    entries: Entries[];
  };
};
