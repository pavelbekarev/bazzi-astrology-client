import React, { useEffect } from "react";
import { StoreService } from "#shared/lib/services/StoreService";
import { BookService } from "./BookService--old";
import { ContactMe } from "./ContactMe";
import { FormManager } from "../model";

/**
 * Визуальное представление формы
 */
export const FormManagerUI = () => {
  useEffect(() => {
    new FormManager({ storeService: StoreService.getInstance("mainStorage") });
  }, []);

  return (
    <div className={"formManager container"}>
      <ContactMe />
      <div className={"formManager__bookService"} data-js-form-container />
    </div>
  );
};
