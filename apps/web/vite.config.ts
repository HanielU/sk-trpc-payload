import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import unocss from "unocss/vite";

const config: UserConfig = {
  plugins: [unocss(), sveltekit()],
};

export default config;
