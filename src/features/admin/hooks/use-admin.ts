"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAdminWish,
  getAdminConfig,
  getAdminStats,
  getAdminWishes,
  saveBranding,
  saveCatalog,
  setUserBlocked,
} from "../lib/admin-api";

export function useAdminConfig() {
  return useQuery({
    queryKey: ["admin", "config"],
    queryFn: getAdminConfig,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useAdminStats(days: number) {
  return useQuery({ queryKey: ["admin", "stats", days], queryFn: () => getAdminStats(days) });
}

export function useAdminWishes(q: string, page: number) {
  return useQuery({
    queryKey: ["admin", "wishes", q, page],
    queryFn: () => getAdminWishes(q, page),
  });
}

/** Saving branding or catalog refreshes both the admin copy and the public config. */
function useRefresh(): () => Promise<void> {
  const qc = useQueryClient();
  return async () => {
    await Promise.all([
      qc.invalidateQueries({ queryKey: ["admin", "config"] }),
      qc.invalidateQueries({ queryKey: ["site-config"] }),
    ]);
  };
}

export function useSaveBranding() {
  const refresh = useRefresh();
  return useMutation({ mutationFn: saveBranding, onSuccess: refresh });
}

export function useSaveCatalog() {
  const refresh = useRefresh();
  return useMutation({ mutationFn: saveCatalog, onSuccess: refresh });
}

export function useDeleteWish() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminWish,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin"] }),
  });
}

export function useBlockUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (v: { id: string; blocked: boolean }) => setUserBlocked(v.id, v.blocked),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "wishes"] }),
  });
}
