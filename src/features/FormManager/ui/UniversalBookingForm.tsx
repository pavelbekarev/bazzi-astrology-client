import React, { useState } from "react";

/**
 *
 */
export const UniversalBookingForm = ({ info }) => {
  const { entries } = info;
  console.debug(entries);

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
            <input id={item.name} type={"text"} placeholder={item.nameRus} />
          </div>
        );
      })}
      <button
        type={"submit"}
        className={"formManager__bookService__form__submitBtn"}
      >
        Записаться
      </button>
    </form>
  );
};
