import React, { useEffect, useState } from "react";
import { ModalManager } from "#shared/lib/plugins/modalManager";

/**
 *
 */
export const ServiceList = ({
  services,
  mode,
}: {
  services: any;
  mode: string;
}) => {
  const [userMode, setUserMode] = useState<string>("user");

  const submitBtnText = () => {
    switch (userMode) {
      case "user":
        return "Подробнее";

      case "admin":
        return "Редактировать";

      default:
        break;
    }
  };

  useEffect(() => {
    setUserMode(mode);

    new ModalManager({
      selector: "[data-js-service-item-button]",
      info: services,
      mode: mode,
    });
  }, []);

  return (
    <>
      {services.map((service, key) => {
        return (
          <div
            key={key}
            className={"servicesApp__serviceWrapper__serviceItem"}
            data-js-service-item={""}
          >
            <img
              className={"servicesApp__serviceWrapper__serviceItem__image"}
              src={service.imagePath}
              alt={service.name}
            />
            <span
              className={"servicesApp__serviceWrapper__serviceItem__name"}
              id={"serviceItem__name"}
            >
              {service.name ? service.name : "Здесь пусто"}
            </span>
            <span
              className={
                "servicesApp__serviceWrapper__serviceItem__shortDescription"
              }
              id={"serviceItem__shortDescription"}
            >
              {service.shortDescription
                ? service.shortDescription
                : "Здесь пусто"}
            </span>
            <span
              className={"servicesApp__serviceWrapper__serviceItem__button"}
              data-js-service-item-button={key}
            >
              {submitBtnText()}
            </span>
          </div>
        );
      })}
    </>
  );
};
