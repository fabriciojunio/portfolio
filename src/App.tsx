import { useState } from "react";
import BootScreen from "./ide/BootScreen";
import Layout from "./ide/Layout";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Layout />
      {!ready && <BootScreen onDone={() => setReady(true)} />}
    </>
  );
}
