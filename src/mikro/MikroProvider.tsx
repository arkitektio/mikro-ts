import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import React, { useState } from "react";
import { createMikroClient } from "./client";
import { MikroContext } from "./MikroContext";
import { MikroConfig, MikroState } from "./types";

export type MikroProps = {
  children: React.ReactNode;
  clientCreator?: (config: MikroConfig) => ApolloClient<NormalizedCacheObject>;
};

export const MikroProvider: React.FC<MikroProps> = ({
  children,
  clientCreator = createMikroClient,
}) => {
  const [state, setState] = useState<MikroState>({
    config: undefined,
    client: undefined,
  });

  const configure = (config?: MikroConfig) => {
    if (!config) {
      setState({
        config: undefined,
        client: undefined,
      });
      return;
    }

    setState({ config: config, client: clientCreator(config) });
  };

  return (
    <MikroContext.Provider
      value={{
        configure: configure,
        ...state,
      }}
    >
      {children}
    </MikroContext.Provider>
  );
};
