import { useState } from "react";
import "./App.css";
import { FaktsProvider, FaktsGuard, useFakts } from "fakts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Callback } from "./contrib/Callback";
import { NoFakts } from "./NoFakts";
import { NoHerre } from "./NoHerre";
import { HerreGuard, HerreProvider, useHerre } from "herre";
import { MikroGuard, MikroProvider, withMikro } from "./mikro";
import { MikroAutoConfigure } from "./contrib/MikroAutoConfigure";
import { NoMikro } from "./NoMikro";
import {
  useMyExperimentsQuery,
  useMySamplesEventSubscription,
} from "./api/mikro/graphql";

export const Test = () => {
  const { data } = withMikro(useMyExperimentsQuery)();

  return <>{JSON.stringify(data)}</>;
};

export const TestSubscription = () => {
  const { data } = withMikro(useMySamplesEventSubscription)();

  return <>{JSON.stringify(data)}</>;
};

export const ProtectedApp = () => {
  return (
    <HerreGuard fallback={<NoHerre />}>
      <MikroProvider>
        <MikroAutoConfigure />
        <MikroGuard fallback={<NoMikro />}>
          <Test />
          <TestSubscription />
        </MikroGuard>
      </MikroProvider>
    </HerreGuard>
  );
};

function App() {
  const [count, setCount] = useState(0);

  const doRedirect = (url: string) => {
    console.log("Redirecting to", url);
    window.location.replace(url);
  };

  return (
    <div className="App">
      <FaktsProvider>
        <FaktsGuard fallback={<NoFakts />}>
          <HerreProvider doRedirect={doRedirect}>
            <Router>
              <Routes>
                <Route path="/" element={<ProtectedApp />} />
                <Route path="/callback" element={<Callback />} />
              </Routes>
            </Router>
          </HerreProvider>
        </FaktsGuard>
      </FaktsProvider>
    </div>
  );
}

export default App;
