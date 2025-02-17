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

const configViewService: FormManagerConfig = {
  method: "post",
  apiEndPoint: "booking/createBooking",
  info: {
    entries: [
      { name: "name", nameRus: "Ваше имя", type: "text" },
      { name: "tgName", nameRus: "Ваш ник в телеграме", type: "text" },
      { name: "serviceName", nameRus: "Название услуги", type: "select" },
    ],
  },
};

const configEditService: FormManagerConfig = {
  method: "put",
  apiEndPoint: "serve/editServe",
  info: {
    entries: [
      {
        name: "name",
        nameRus: "Название услуги",
        type: "text",
      },
      {
        name: "shortDescription",
        nameRus: "Краткое описание услуги",
        type: "text",
      },
      {
        name: "description",
        nameRus: "Описание услуги",
        type: "text",
      },
      {
        name: "descriptionPoints",
        nameRus: "Что в себя включает услуга",
        type: "textarea",
      },
      {
        name: "descriptionAfter",
        nameRus: "Описание после",
        type: "text",
      },
      {
        name: "imagePath",
        nameRus: "Фотография",
        type: "file",
      },
      {
        name: "format",
        nameRus: "Формат услуги",
        type: "text",
      },
      {
        name: "price",
        nameRus: "Стоимость услуги",
        type: "text",
      },
    ],
  },
};

const configCreateService: FormManagerConfig = {
  method: "post",
  apiEndPoint: "serve/createServe",
  info: {
    entries: [
      {
        name: "name",
        nameRus: "Название услуги",
        type: "text",
      },
      {
        name: "shortDescription",
        nameRus: "Краткое описание услуги",
        type: "text",
      },
      {
        name: "description",
        nameRus: "Описание услуги",
        type: "text",
      },
      {
        name: "descriptionPoints",
        nameRus: "Что в себя включает услуга",
        type: "textarea",
      },
      {
        name: "descriptionAfter",
        nameRus: "Описание после",
        type: "text",
      },
      {
        name: "imagePath",
        nameRus: "Фотография",
        type: "file",
      },
      {
        name: "format",
        nameRus: "Формат услуги",
        type: "text",
      },
      {
        name: "price",
        nameRus: "Стоимость услуги",
        type: "text",
      },
    ],
  },
};

const validationRulesForBookingService = {
  name: (value: string) =>
    value.length >= 3 || "Имя пользователя должно содержать минимум 3 символа.",
  tgName: (value: string) =>
    value.startsWith("@") || "Имя Telegram должно начинаться с @.",
  serviceName: (value: string) => value !== "" || "Необходимо выбрать услугу.",
};

const buttonTypes = ["editButton", "saveButton", "openInfoButton"];

export {
  buttonTypes,
  configCreateService,
  configEditService,
  configSimple,
  configViewService,
  validationRulesForBookingService,
};
