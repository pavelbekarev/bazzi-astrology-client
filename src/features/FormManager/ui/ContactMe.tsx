import React from "react";
import { telegramLink, vkLink } from "#shared/config/config";
import { SectionTitle } from "#shared/ui/SectionTitle";
import { TgIcon } from "#shared/ui/TgIcon/ui";
import { VkIcon } from "#shared/ui/VkIcon/ui";

/**
 *
 */
export const ContactMe = () => {
  return (
    <div className={"formManager__contactMe"}>
      <SectionTitle
        text={"Свяжитесь со мной"}
        textColor={"var(--colorSilver)"}
        extraClasses={["formManager__contactMe__title"]}
      />
      <div className={"formManager__contactMe__socialNetworks"}>
        {/* <img className={"form__contactMe__socialNetworks__icon"} src={vkIcon} /> */}
        <a
          className={"formManager__contactMe__socialNetworks__icon"}
          href={vkLink}
        >
          <VkIcon color={"var(--colorSilver)"} />
        </a>
        <a
          className={"formManager__contactMe__socialNetworks__icon"}
          href={telegramLink}
        >
          <TgIcon color={"var(--colorSilver)"} />
        </a>
      </div>
    </div>
  );
};
