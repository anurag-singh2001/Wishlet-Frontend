import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "@/lib/api";

export function useTemplates() {
  return useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
}
