import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { MikroContextType } from "./types";

export const MikroContext = React.createContext<MikroContextType>({
  configure: () => {
    throw Error("No Provider in context not configured");
  },
});

export const useMikro = () => useContext(MikroContext);

export const useMikroQuery = (query: any) => {
  const { client } = useMikro();
  return useQuery(query, { client: client });
};

export function withMikro<T extends (options: any) => any>(func: T): T {
  const Wrapped = (nana: any) => {
    const { client } = useMikro();
    return func({ ...nana, client: client });
  };
  return Wrapped as T;
}
