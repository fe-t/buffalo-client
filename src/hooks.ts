import qs from "qs";
import { useLocation } from "react-router-dom";

export function useParamsBy(key: string): string | undefined {
  const location = useLocation();
  const parsed = qs.parse(location.search, { ignoreQueryPrefix: true });
  return parsed[key] as string | undefined;
}
