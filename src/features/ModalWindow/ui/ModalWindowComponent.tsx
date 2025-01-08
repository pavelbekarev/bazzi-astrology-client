import React from "react";

/**
 *
 */
export const ModalWindowComponent = ({ info }: { info?: any }) => {
  const { name, descriptionAfter } = info[0].info;
  console.debug(info[0].info);
  return (
    <>
      <div className={"modalWindow"}>
        <h2>{name}</h2>
        <h2>{descriptionAfter}</h2>
      </div>
    </>
  );
};
