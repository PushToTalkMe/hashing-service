export const ALGORITHMS = ["md5", "sha1", "sha256"] as const;
export type Algorithm = (typeof ALGORITHMS)[number];
