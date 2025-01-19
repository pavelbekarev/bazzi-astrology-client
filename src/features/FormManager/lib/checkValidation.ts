/**
 * Проверка на валидность данных в форме
 */
export const checkFormOnValidation = (info: Record<string, any>): boolean => {
  const allFieldsFilled = Object.keys(info).every((field) => {
    const isFieldFilled = info[field] !== null && info[field] !== "";
    if (!isFieldFilled) {
      console.error(`Поле "${field}" не заполнено.`);
    }
    return isFieldFilled;
  });

  return allFieldsFilled;
};
