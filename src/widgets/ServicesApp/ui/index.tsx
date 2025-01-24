import React, { useEffect } from "react";
// eslint-disable-next-line no-restricted-imports
import { ServiceFactory } from "#features/ServicesFactory/model";
import { SectionTitle } from "#shared/ui/SectionTitle";

/**
 *
 */
export const ServicesApp = ({ mode }) => {
  useEffect(() => {
    new ServiceFactory({ mode: mode });
  }, []);

  return (
    <div className={"servicesApp"}>
      <div className={"container"}>
        <SectionTitle
          text={"Услуги"}
          textColor={"var(--colorSilver)"}
          extraClasses={["servicesApp__title"]}
        />
        <div
          className={"servicesApp__serviceWrapper"}
          data-js-service-wrapper={""}
        />
      </div>
    </div>
  );
};
