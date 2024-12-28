import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import utilService from "../utils/utils.service";

export default function ScrollToTop() {
  const location = useLocation();
  const locationArr = location.pathname.split("/");
  const pathname = locationArr[1];
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${utilService.formatAndCapitalizeString(
      pathname
    )} - Aghaahi`;
  }, [locationArr]);

  return null;
}
