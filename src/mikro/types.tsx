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

export type MikroClient = ApolloClient<NormalizedCacheObject>;
