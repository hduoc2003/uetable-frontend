declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      NODE_ENV: "development" | "production";
      ACCEPTABLE_FILE_EXTENSION: string;
      ACCEPTABLE_FILE_SIZE: string;
    }
  }
}
export {}
