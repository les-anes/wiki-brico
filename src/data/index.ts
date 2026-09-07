import type { Tutorial } from "@/types";
const files = import.meta.glob("./tutorials/**/*.json", {
  eager: true,
  import: "default",
});
export const tutorials = Object.values(files) as Tutorial[];
