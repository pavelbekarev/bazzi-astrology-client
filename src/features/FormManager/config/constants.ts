import { FormManagerConfig } from "./types/FormManagerConfigType";

const configSimple: FormManagerConfig = {
  method: "post",
  apiEndPoint: "api/",
  info: {
    entries: [
      { name: "name", nameRus: "Ваше имя", type: "text" },
      { name: "email", nameRus: "Электронная почта", type: "email" },
      { name: "phoneNumber", nameRus: "Номер телефона", type: "number" },
    ],
  },
};

const configAdvance: FormManagerConfig = {
  method: "post",
  apiEndPoint: "api/",
  info: {
    entries: [
      { name: "name", nameRus: "Ваше имя", type: "text" },
      { name: "tgName", nameRus: "Ваш ник в телеграме", type: "text" },
      { name: "serviceName", nameRus: "Название услуги", type: "select" },
    ],
  },
};

export { configAdvance, configSimple };
