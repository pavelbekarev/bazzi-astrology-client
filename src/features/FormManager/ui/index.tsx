import React from "react";
import { BookService } from "./BookService";
import { ContactMe } from "./ContactMe";

/**
 * Визуальное представление формы
 */
export const FormManager = () => {
  return (
    <div className={"formManager container"}>
      <ContactMe />
      <BookService />
    </div>
  );
};
