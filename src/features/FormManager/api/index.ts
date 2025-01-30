import { api } from "#shared/api/axiosInstance";

//TODO: переписать чтобы были универсальные методы
// А данные брать из конфигов.

/**
 *
 */
export const createBooking = async ({ data }) => {
  try {
    const { entries, apiEndPoint, formData } = data;
    console.debug("apiEndPoint", apiEndPoint);

    const formDataObject = {};
    formData.forEach((value: any, key: any) => {
      if (key === "name") key = "userName";
      formDataObject[key] = value;
    });
    console.debug(formDataObject);

    const info = {};

    entries.forEach((item: any) => {
      if (formDataObject[item.name]) {
        info[item.name] = formDataObject[item.name];
      }
    });

    Object.keys(formDataObject).forEach((key: any) => {
      if (!info[key]) {
        info[key] = formDataObject[key];
      }
    });

    console.debug(info);

    await api.post(apiEndPoint, info);
  } catch (e) {
    console.error(e);
  }
};

/**
 * Получение всех записей из базы данных
 */
export const getBooking = async () => {
  try {
    return await api.get("booking/getBooking");
  } catch (e) {
    console.error(e);
  }
};
