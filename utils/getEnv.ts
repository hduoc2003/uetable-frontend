interface EnvProps {
    ENVIRONMENT: string
    API_URL: string
}

export default function getEnv(key: keyof EnvProps): string {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Env ${key} does not exist`);
    }
    return process.env[key] as string;
}
