import React, { useEffect } from "react";
import { FormManager } from "#shared/lib/plugins/formManager";
import { StoreService } from "#shared/lib/services/StoreService";
import { ContactMe } from "./ContactMe";

/**
 * Визуальное представление формы
 */
export const FormManagerUI = ({ operation }: { operation?: any }) => {
  useEffect(() => {
    new FormManager({
      storeService: StoreService.getInstance("mainStorage"),
    });
  }, []);

  return (
    <div className={"formManager container"}>
      <div className={"formManager__bookService"} data-js-form-container />
      <ContactMe />
    </div>
  );
};
