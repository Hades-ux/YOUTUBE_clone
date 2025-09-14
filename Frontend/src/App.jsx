import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from "./routes/AuthRoute";
import MainRoute from "./routes/MainRoute";
import StudioRoutes from "./routes/studioRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={<AuthRoute />} />
        <Route path="/*" element={<MainRoute />} />
        <Route path="studio/*" element={<StudioRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
