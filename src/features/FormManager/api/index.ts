import { api } from "#shared/api/axiosInstance";

/**
 *
 */
export const createBooking = async ({ data }) => {
  try {
    const info = {
      userName: data.get("name"),
      tgName: data.get("tgName"),
      serviceName: data.get("serviceName"),
    };

    await api.post("booking/createBooking", info);
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
