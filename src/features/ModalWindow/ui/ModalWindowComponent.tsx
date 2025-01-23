import React from "react";

/**
 *
 */
export const ModalWindowComponent = ({ info }: { info?: any }) => {
  const { name, descriptionAfter, descriptionPoints, price, format } =
    info[0].info;

  const handleClickPrice = () => {
    const modalWindowPrice = document.querySelector("[data-js-price]");
    modalWindowPrice.classList.add("modalWindow__price--active");
  };

  return (
    <>
      <div
        data-js-modal-window={""}
        className={"modalWindow"}
        id={"modalWindow"}
      >
        <span data-js-close-modal={""} className={"closeButton"} />
        <h2 className={"modalWindow__title"}>{name}</h2>
        <ul className={"modalWindow__descriptionList"}>
          {descriptionPoints.map((item: string, key: any) => {
            return (
              <li
                key={key}
                className={"modalWindow__descriptionList__description"}
              >
                {item}
              </li>
            );
          })}
        </ul>
        {/* <p className={"modalWindow__description"}>{description_points}</p> */}
        <p className={"modalWindow__format"}>Формат услуги: {format}</p>
        <p className={"modalWindow__price"}>
          Стоимость услуги:{" "}
          <span onClick={handleClickPrice} data-js-price={""}>
            {price}
          </span>
        </p>
      </div>
    </>
  );
};
