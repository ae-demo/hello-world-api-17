import createClient from "openapi-fetch";
import type { paths } from "./generated/hello-api";
import { env } from "./env";

const BASE_URL = env.HELLO_API_URL;
if (!BASE_URL) {
  throw new Error("HELLO_API_URL not set in window._env_");
}

export const helloApi = createClient<paths>({ baseUrl: BASE_URL });
