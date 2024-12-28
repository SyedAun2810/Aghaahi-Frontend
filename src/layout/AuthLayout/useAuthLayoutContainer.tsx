import { useLocation, useNavigate } from "react-router-dom";

export const useAuthLayoutContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const route = location.pathname.split("/");
  const selectedKey = route[1] ? route[1] : "user-management";
  return {  location, route, selectedKey , navigate};
};
