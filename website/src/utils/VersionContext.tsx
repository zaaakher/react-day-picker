import { PropsWithChildren, createContext, useContext, useState } from "react";

export type Version = "main" | "next";

interface VersionContextProps {
  version: string;
  setVersion: React.Dispatch<React.SetStateAction<Version>>;
}

export const VersionContext = createContext<VersionContextProps>({
  version: "main",
  setVersion: () => {},
});

export function VersionProvider({ children }: PropsWithChildren) {
  const [version, setVersion] = useState<Version>("main");

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error("useVersion must be used within a VersionProvider");
  }
  return context;
}