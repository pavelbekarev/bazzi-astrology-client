import React from "react";
import { ServiceItems } from "#shared/config/serviceItemsForSelect";
import { SectionTitle } from "#shared/ui/SectionTitle";

/**
 *
 */
export const BookService = () => {
  return (
    <div className={"formManager__bookService"}>
      <SectionTitle
        extraClasses={["formManager__bookService__title"]}
        text={"Записаться на разбор"}
      />
      <form
        action={"api/"}
        method={"post"}
        className={"formManager__bookService__form"}
      >
        <div className={"formManager__bookService__form__label"}>
          <label htmlFor={"name"}>Ваше имя</label>
          <input id={"name"} type={"text"} />
        </div>
        <div className={"formManager__bookService__form__label"}>
          <label htmlFor={"tgName"}>Ваше ник в телеграме</label>
          <input id={"tgName"} type={"text"} />
        </div>
        <div className={"formManager__bookService__form__label"}>
          <label htmlFor={"serviceName"}>Название услуги</label>
          <select name={"serviceName"} id={"serviceName"}>
            {ServiceItems.map((item, key) => {
              return (
                <option key={key} value={item.toString()}>
                  {item.toString()}
                </option>
              );
            })}
          </select>
        </div>
        <button
          data-js-submit-button={""}
          className={"formManager__bookService__form__submitBtn"}
          type={"submit"}
        >
          Записаться
        </button>
      </form>
    </div>
  );
};
