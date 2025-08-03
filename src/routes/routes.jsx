import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import EntityDetail from "../pages/EntityDetails";

// Route path constants
export const ROUTES = {
  HOME: "/",
  ENTITY_DETAIL: "/entity/:id",
};

// Helper function to generate entity detail path
export const getEntityDetailPath = (id) => ROUTES.ENTITY_DETAIL.replace(":id", id);

const AppRoutes = () => {
  console.log('AppRoutes component rendering');
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ENTITY_DETAIL} element={<EntityDetail />} />
    </Routes>
  );
};

export default AppRoutes;