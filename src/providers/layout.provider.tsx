// "use client";

// import React from "react";
// import { cn } from "@/lib/utils";
// import { useConfig } from "@/hooks/use-config";

// const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
//   const [config] = useConfig();

//   return (
//     <div
//       className={cn(
//         "flex  min-h-svh w-full flex-col bg-default-100 dark:bg-background ",
//         {
//           "bg-transparent": config.skin === "bordered",
//           "xl:px-20": config.layout === "semi-box",
//           "lg:p-10  p-6": config.layout === "compact",
//         }
//       )}
//     >
//       {children}
//     </div>
//   );
// };

// export default LayoutProvider;
