import React, { useEffect } from "react";

export const Profile: React.FC<{ name: string }> = (props) => {
  useEffect(() => {
    console.info("Profile - tick");
  });

  return (
    <section>
      <h4 className="text-3xl font-bold underline">{props.name}</h4>
    </section>
  );
};
