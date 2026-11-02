import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Defaults are enough for this site. An R2 incremental cache can be added
// later if pages need `revalidate` to persist between deploys.
export default defineCloudflareConfig();
