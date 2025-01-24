import React, { useEffect } from "react";
import { FormManager } from "#shared/lib/plugins/formManager";
import { StoreService } from "#shared/lib/services/StoreService";

/**
 *
 */
export const ModalWindowAdminPage = ({ mode }) => {
  useEffect(() => {
    console.debug("mode", mode);
    new FormManager({
      storeService: StoreService.getInstance("mainStorage"),
      mode: mode,
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