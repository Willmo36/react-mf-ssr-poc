import React from "react";

export const Loading: React.FC<{ text: string }> = ({ text }) => (
  <div className="animate-pulse p-8 m-1 bg-gray-200 rounded flex">{text}</div>
);
