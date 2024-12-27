import React from "react";

/**
 *
 */
export const SectionTitle = ({
  extraClasses = [],
  extraAttrs = [],
  textColor = "",
  text = "",
} = {}) => {
  return (
    <div className={`sectionTitle ${extraClasses.join(" ")}`}>
      <span style={{ color: textColor ? textColor : "" }}>{text}</span>
    </div>
  );
};
