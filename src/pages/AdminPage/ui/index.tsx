import React, { useEffect } from "react";
import { ModalManager } from "#shared/lib/plugins/modalManager";
import { HeaderMenu } from "#shared/ui/HeaderMenu";
import { HeaderMenuInfo } from "#shared/ui/HeaderMenu/config/interface/HeaderMenuInfo";
import { ServicesApp } from "#widgets/ServicesApp";

/**
 *
 */
export const AdminPage = () => {
  const headerMenuInfo: HeaderMenuInfo = {
    title: "Бацзы - китайская астрология",
    linkInfo: [
      {
        linkText: "Список услуг",
        linkTo: "/",
      },
      {
        linkText: "Обратная связь",
        linkTo: "/",
      },
    ],
  };

  return (
    <>
      <header className={"adminPage__header"}>
        <div className={"adminPage__header__menu container"}>
          <HeaderMenu info={headerMenuInfo} />
          <button
            type={"submit"}
            id={"createServiceBtn"}
            data-js-create-service={""}
            className={"adminPage__header__menu__addServiceButton"}
          >
            Добавить услугу
          </button>
        </div>
      </header>
      <main>
        <ServicesApp mode={"admin"} />
      </main>
    </>
  );
};
