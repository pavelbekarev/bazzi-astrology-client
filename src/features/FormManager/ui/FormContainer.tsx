import React from "react";
import { SectionTitle } from "#shared/ui/SectionTitle";
import { UniversalBookingForm } from "./UniversalBookingForm";
import { BookServiceConfig } from "../config/types/BookServiceConfig";

/**
 *
 */
export const BookService = ({
  config,
  extraClasses,
}: {
  config: BookServiceConfig;
  extraClasses?: any;
}) => {
  const { info } = config;
  console.debug("bookService", info);

  return (
    <>
      <SectionTitle extraClasses={[extraClasses.join(" ")]} text={info.title} />
      <UniversalBookingForm
        extraClasses={["formManager__bookService__adminForm"]}
        info={info}
      />
    </>
  );
};
