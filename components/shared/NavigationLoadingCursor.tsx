"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const LOADING_CLASS = "route-loading";
const FALLBACK_TIMEOUT_MS = 8000;

export function NavigationLoadingCursor() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const clearLoading = () => {
      document.documentElement.classList.remove(LOADING_CLASS);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const startLoading = () => {
      document.documentElement.classList.add(LOADING_CLASS);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      // Prevent stale loading cursor if navigation is cancelled or intercepted.
      timeoutRef.current = window.setTimeout(clearLoading, FALLBACK_TIMEOUT_MS);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const target = event.target as Element | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      if (link.target === "_blank" || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      const current = new URL(window.location.href);

      if (destination.origin !== current.origin) return;

      const onlyHashChanged =
        destination.pathname === current.pathname &&
        destination.search === current.search &&
        destination.hash !== current.hash;

      if (onlyHashChanged) return;

      startLoading();
    };

    const handleSubmit = (event: SubmitEvent) => {
      if (event.defaultPrevented) return;
      startLoading();
    };

    const handleBeforeUnload = () => {
      startLoading();
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearLoading();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(LOADING_CLASS);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [pathname, searchParams]);

  return null;
}
