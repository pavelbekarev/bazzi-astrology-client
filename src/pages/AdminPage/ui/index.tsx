import React, { useState } from "react";
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
        <div className={"container"}>
          <HeaderMenu info={headerMenuInfo} />
        </div>
      </header>
      <main>
        <ServicesApp mode={"admin"} />
      </main>
    </>
  );
};
