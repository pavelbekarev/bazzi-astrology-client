import React from "react";

/**
 *
 */
export const ServiceList = ({ services }) => {
  return (
    <>
      {services.map((service, key) => (
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
            Подробнее
          </span>
        </div>
      ))}
    </>
  );
};
