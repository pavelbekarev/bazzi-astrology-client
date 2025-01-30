/* eslint-disable no-restricted-imports */
import React from "react";
import { FormManagerUI } from "#features/FormManager/ui";
import { HeaderMenuInfo } from "#shared/ui/HeaderMenu/config/interface/HeaderMenuInfo";
import { HeaderMenu } from "#shared/ui/HeaderMenu/index";
import { SectionTitle } from "#shared/ui/SectionTitle";
import { ServicesApp } from "#widgets/ServicesApp";

/**
 *
 */
export const MainPage = () => {
  var titleText = "Познай себя сквозь призму китайской метафизики";
  const headerMenuInfo: HeaderMenuInfo = {
    linkInfo: [
      { linkText: "Главная", linkTo: "/" },
      { linkText: "О бацзы", linkTo: "/pageAbout" },
      { linkText: "Админ панель", linkTo: "/admin" },
    ],
  };

  return (
    <>
      <header className={"mainPage__header"}>
        <div className={"container"}>
          <HeaderMenu info={headerMenuInfo} />
          <SectionTitle
            text={titleText}
            textColor={"var(--colorCream)"}
            extraClasses={["mainPage__header__title"]}
          />
        </div>
      </header>
      <main>
        <ServicesApp mode={"user"} />
        <section className={"formManagerWrapper"}>
          <FormManagerUI />
        </section>
      </main>
    </>
  );
};
