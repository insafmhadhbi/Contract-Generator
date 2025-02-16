import React from "react";
import clsx from "clsx";

const ContractDot = ({ className }) => {
  return (
    <div className={clsx("dot-container", className)}>
      <span className="dot"></span>
    </div>
  );
};

export default ContractDot;
