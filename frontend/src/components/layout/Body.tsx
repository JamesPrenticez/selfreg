import React, { type ReactElement, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Body ({ children }: Props): ReactElement {
  return (
    <div className="w-full mx-auto min-h-screenNav bg-white">
      {children}
    </div>
  );
};

export default Body;
