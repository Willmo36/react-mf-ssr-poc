import React, { useEffect } from "react";
import { FallbackProps } from "react-error-boundary";

export const FragmentError: React.FC<FallbackProps> = (props) => {
  useEffect(() => {
    console.warn("FragmentError: ", props.error);
  }, [props.error]);
  return <div className="p-8 m-1 bg-red-200 rounded flex">Failed to load</div>;
};
