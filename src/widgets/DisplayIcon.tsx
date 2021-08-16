import React, { FC } from "react";

const DisplayIcon: FC<{ src: string; alt?: string }> = ({ src, alt }) => {
  return (
    <div className="DisplayIcon">
      <img src={src} alt={alt} />
    </div>
  );
};

export default DisplayIcon;
