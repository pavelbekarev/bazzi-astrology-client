/**
 *
 */
export const checkFormOnValidation = (info: any): Boolean => {
  const { userName, tgName, serviceName } = info;

  if (!userName || !tgName || !serviceName) {
    console.warn("Все поля обязательны к заполнению");
    return false;
  } else {
    return true;
  }
};
