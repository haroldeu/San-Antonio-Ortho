const repoBasePath = "/San-Antonio-Ortho";

export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? repoBasePath : "");
