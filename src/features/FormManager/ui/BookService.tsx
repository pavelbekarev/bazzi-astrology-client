import React from "react";
import { SectionTitle } from "#shared/ui/SectionTitle";
import { UniversalBookingForm } from "./UniversalBookingForm";
import { BookServiceConfig } from "../config/types/BookServiceConfig";

/**
 *
 */
export const BookService = ({ config }: { config: BookServiceConfig }) => {
  const { info } = config;

  return (
    <>
      <SectionTitle
        extraClasses={["formManager__bookService__title"]}
        text={info.title}
      />
      <UniversalBookingForm info={info} />
    </>
  );
};
