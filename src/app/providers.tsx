"use client";

import { AppProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <AppProgressBar
        height="5px"
        color="#DB6885"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;
