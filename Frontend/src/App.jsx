import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from "./routes/AuthRoute";
import MainRoute from "./routes/MainRoute";
import StudioRoutes from "./routes/studioRoutes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={<AuthRoute />} />
        <Route path="/*" element={<MainRoute />} />
        <Route path="studio/*" element={<StudioRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
