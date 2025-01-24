import React, { useEffect, useState } from "react";
import { StoreService } from "#shared/lib/services/StoreService";

/**
 *
 */
export const UniversalBookingForm = ({ info }) => {
  const { entries } = info;

  const storeService = StoreService.getInstance("mainStorage");

  const [formData, setFormData] = useState<{ [key: string]: string }>(
    entries.reduce(
      (acc: any, item: any) => {
        acc[item.name] = "";

        /* устанавливаем по умолчанию первое значение */
        if (item.type === "select") {
          acc[item.name] = item.options[0];
        }
        return acc;
      },
      {} as { [key: string]: string }
    )
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <form className={"formManager__bookService__form"}>
      {entries.map((item: any, key: any) => {
        const dataJsAttr = "data-js-" + item.name;

        return (
          <div
            {...{ [dataJsAttr.toLowerCase()]: "" }}
            key={key}
            className={"formManager__bookService__form__label"}
          >
            <label htmlFor={item.name} />
            {(() => {
              switch (item.type) {
                case "select":
                  return (
                    <select
                      id={item.name}
                      value={formData[item.name]}
                      onChange={handleInputChange}
                      className={
                        "formManager__bookService__form__label__select"
                      }
                    >
                      {item.options.map((option: string, index: number) => (
                        <option
                          className={
                            "formManager__bookService__form__label__select__option"
                          }
                          key={index}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  );
                default:
                  return (
                    <input
                      id={item.name}
                      type={item.type}
                      placeholder={item.nameRus}
                      value={formData[item.name]}
                      onChange={handleInputChange}
                      className={"formManager__bookService__form__input"}
                    />
                  );
              }
            })()}
          </div>
        );
      })}
      <button
        data-js-submit-button={JSON.stringify(formData)}
        type={"submit"}
        className={"formManager__bookService__form__submitBtn"}
      >
        Записаться
      </button>
    </form>
  );
};
