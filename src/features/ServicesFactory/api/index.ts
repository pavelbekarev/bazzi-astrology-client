import { api } from "#shared/api/axiosInstance";

/**
 *
 */
export const getServices = async () => {
  try {
    return await api.get("serve/getServeStorage");
  } catch (e) {
    console.error(e);
  }
};

/**
 * Добавление услуг в базу
 */
export const postService = async ({ data }) => {
  try {
    console.debug("postServices", data);
    data.map(async (item) => {
      await api.post("serve/createServe", item);
    });
  } catch (e) {
    console.error(e);
  }
};
