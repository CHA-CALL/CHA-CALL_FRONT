import { RouterProvider } from "react-router-dom";
import { router } from "./src/routes/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
