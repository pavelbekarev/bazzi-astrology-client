import React, { useEffect, useState } from "react";
import { CustomSelect } from "#shared/ui/CustomSelect";
import { SectionTitle } from "#shared/ui/SectionTitle";
import { BookServiceConfig } from "../config/types/BookServiceConfig";
import { getAttr } from "#shared/utils/getAttr";
import { UniversalBookingForm } from "./UniversalBookingForm";

/**
 *
 */
export const BookService = ({ config }: { config: BookServiceConfig }) => {
  const [userName, setUserName] = useState<string>("");
  const [tgName, setTgName] = useState<string>("");
  const [serviceName, setServiceName] = useState<string>();

  const { info } = config;

  return (
    <>
      <SectionTitle
        extraClasses={["formManager__bookService__title"]}
        text={"Записаться на разбор"}
      />
      <UniversalBookingForm info={info} />
      {/* <form data-js-form={""} className={"formManager__bookService__form"}>
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
          <CustomSelect />
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
      </form> */}
    </>
  );
};
