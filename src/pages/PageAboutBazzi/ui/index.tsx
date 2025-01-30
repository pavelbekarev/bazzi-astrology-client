import React from "react";
import aboutImage from "#assets/about-image.jpg";
import { HeaderMenu } from "#shared/ui/HeaderMenu";
import { HeaderMenuInfo } from "#shared/ui/HeaderMenu/config/interface/HeaderMenuInfo";

/**
 *
 */
export const PageAboutBazzi = () => {
  const infoForHeaderMenu: HeaderMenuInfo = {
    title: "Бацзы - китайская астрология",
    linkInfo: [
      { linkText: "Главная", linkTo: "/" },
      { linkText: "О бацзы", linkTo: "/pageAbout" },
    ],
  };

  return (
    <>
      <header className={"pageAboutBazzi__header"}>
        <div className={"container"}>
          <HeaderMenu info={infoForHeaderMenu} />
        </div>
      </header>
      <main className={"pageAboutBazzi"}>
        <div className={"container"}>
          <img
            className={"pageAboutBazzi__imageContent__image"}
            src={aboutImage}
            alt={""}
          />
          <div className={"pageAboutBazzi__infoContent"}>fasdfasdfasf</div>
        </div>
      </main>
    </>
  );
};
