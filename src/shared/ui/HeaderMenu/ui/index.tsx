import React from "react";

/**
 *
 */
export const HeaderMenu = () => {
  return (
    <ul className={"headerMenu__list"}>
      <li className={"headerMenu__list__item"}>
        <a href={"/"}>Главная</a>
      </li>
      <li className={"headerMenu__list__item"}>
        <a href={"/"}>О бацзы</a>
      </li>
    </ul>
  );
};
