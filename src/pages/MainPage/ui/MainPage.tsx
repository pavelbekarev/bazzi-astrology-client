import React from "react";
import { HeaderMenu } from "#shared/ui/HeaderMenu/index";
import { SectionTitle } from "#shared/ui/SectionTitle";
import { ServicesApp } from "#widgets/ServicesApp";

/**
 *
 */
export const MainPage = () => {
  var titleText = "Познай себя сквозь призму китайской метафизики";

  return (
    <>
      <header className={"mainPage__header"}>
        <div className={"container"}>
          <HeaderMenu />
          <SectionTitle
            text={titleText}
            textColor={"var(--colorCream)"}
            extraClasses={["mainPage__header__title"]}
          />
        </div>
      </header>
      <main>
        <ServicesApp />
      </main>
    </>
  );
};
