import React, { useEffect, useState } from "react";
import { getServiceItems } from "#shared/config/serviceItemsForSelect";

/**
 *
 */
export const CustomSelect = () => {
  const [itemsForSelect, setItemsForSelect] = useState([]);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setItemsForSelect(getServiceItems());
    setReady(true);
  }, []);

  return (
    <select
      className={"formManager__bookService__form__label__select"}
      name={"serviceName"}
      id={"serviceName"}
    >
      {ready &&
        itemsForSelect.map((item, key) => {
          return (
            <option
              className={
                "formManager__bookService__form__label__select__option"
              }
              key={key}
              value={item.toString()}
              data-js-option-item={""}
            >
              {item}
            </option>
          );
        })}
    </select>
  );
};
