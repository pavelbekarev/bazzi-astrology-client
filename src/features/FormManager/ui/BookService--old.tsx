import React, { useState } from "react";
import { ServiceItems } from "#shared/config/serviceItemsForSelect";
import { SectionTitle } from "#shared/ui/SectionTitle";
import { BookServiceConfig } from "../config/types/BookServiceConfig";

/**
 *
 */
export const BookService = ({ config }: { config: BookServiceConfig }) => {
  const [userName, setUserName] = useState<string>("");
  const [tgName, setTgName] = useState<string>("");
  const [serviceName, setServiceName] = useState<string>();

  const { info } = config;
  console.debug("itemsForSelect", info.itemsForSelect);

  return (
    <>
      <SectionTitle
        extraClasses={["formManager__bookService__title"]}
        text={"Записаться на разбор"}
      />
      <form data-js-form={""} className={"formManager__bookService__form"}>
        <div
          data-js-user-name={"userName"}
          className={"formManager__bookService__form__label"}
        >
          <label htmlFor={"name"}>Ваше имя</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            id={"name"}
            type={"text"}
          />
        </div>
        <div
          data-js-tg-name={""}
          className={"formManager__bookService__form__label"}
        >
          <label htmlFor={"tgName"}>Ваше ник в телеграме</label>
          <input
            onChange={(e) => setTgName(e.target.value)}
            id={"tgName"}
            type={"text"}
          />
        </div>
        <div
          data-js-service-name={""}
          className={"formManager__bookService__form__label"}
        >
          <label htmlFor={"serviceName"}>Название услуги</label>
          <select
            className={"formManager__bookService__form__label__select"}
            name={"serviceName"}
            id={"serviceName"}
            onChange={(e) => setServiceName(e.target.value)}
          >
            {info.itemsForSelect.map((item, key) => {
              return (
                <option
                  className={
                    "formManager__bookService__form__label__select__option"
                  }
                  key={key}
                  value={item.toString()}
                  data-js-option-item={""}
                >
                  {item.toString()}
                </option>
              );
            })}
          </select>
        </div>
        <button
          data-js-submit-button={JSON.stringify({
            userName: userName,
            tgName: tgName,
            serviceName: serviceName,
          })}
          type={"submit"}
          className={"formManager__bookService__form__submitBtn"}
        >
          Записаться
        </button>
      </form>
    </>
  );
};
