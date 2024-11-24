import * as process from 'node:process';
import { config } from 'dotenv'

config();

export function getEnv<V>(key: string): V {
    const value = process.env[key] as V;
    if (!value) {
        throw new Error('Error: variable was not found in .env');
    }

    return value;
}