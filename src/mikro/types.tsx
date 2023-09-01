import {
  ApolloClient,
  NormalizedCacheObject,
  PossibleTypesMap,
} from "@apollo/client";

export type MikroConfig = {
  endpointUrl: string;
  wsEndpointUrl: string;
  secure: boolean;
  retrieveToken: () => string;
  possibleTypes?: PossibleTypesMap;
};

export type MikroState = {
  config?: MikroConfig;
  client?: MikroClient;
};

export type MikroContextType = MikroState & {
  configure: (config?: MikroConfig) => void;
};

export type MikroClient = ApolloClient<NormalizedCacheObject>;
