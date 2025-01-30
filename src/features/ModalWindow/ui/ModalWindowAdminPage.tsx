import React, { useEffect } from "react";
import { FormManager } from "#shared/lib/plugins/formManager";
import { StoreService } from "#shared/lib/services/StoreService";

/**
 *
 */
export const ModalWindowAdminPage = ({ operation }: { operation?: any }) => {
  useEffect(() => {
    console.debug("operation", operation);
    new FormManager({
      storeService: StoreService.getInstance("mainStorage"),
      operation: operation,
    });
  }, []);

  return (
    <>
      <div
        data-js-modal-window={""}
        className={"modalWindow"}
        id={"modalWindow"}
        data-js-form-container={""}
      />
    </>
  );
};
