import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from "./routes/AuthRoute";
import MainRoute from "./routes/MainRoute";
import StudioRoutes from "./routes/StudioRoutes";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={<AuthRoute />} />
        <Route path="studio/*" element={<StudioRoutes />} />
        <Route path="/*" element={<MainRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  ); 
}

export default App;
