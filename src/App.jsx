import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./Loading";
import routes from "./routes";

function App() {

  let element = useRoutes(routes);

  return (
    <>
      <Suspense fallback={<Loading />} >
        {element}
      </Suspense>
    </>
  )
}

export default App
