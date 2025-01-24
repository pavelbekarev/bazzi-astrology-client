import React from "react";
import { HeaderMenuInfo } from "../config/interface/HeaderMenuInfo";

/**
 *
 */
export const HeaderMenu = ({ info }: { info: HeaderMenuInfo }) => {
  const { title, linkInfo } = info;
  console.debug(linkInfo);

  return (
    <div className={title ? "headerMenuWithTitle" : "headerMenu"}>
      {title && <h2 className={"headerMenu__title"}>{title}</h2>}

      <ul className={"headerMenu__list"}>
        {linkInfo.map((item, key) => (
          <li key={key} className={"headerMenu__list__item"}>
            <a href={item.linkTo}>{item.linkText}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
