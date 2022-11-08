import React, { useCallback, useEffect } from "react";

export const Profile: React.FC<{ name: string }> = (props) => {
  useEffect(() => {
    console.info("Profile - tick");
  });

  const onclick = useCallback(() => {
    alert("Profile clicked");
  }, []);

  return (
    <section data-origin="profile">
      <h4 onClick={onclick} className="text-3xl font-bold underline">
        {props.name}
      </h4>
    </section>
  );
};

export default Profile;