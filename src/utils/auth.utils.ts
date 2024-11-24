import { ENV__ADMIN_EMAIL, ENV__ADMIN_PASSWORD } from "src/common/database/entity/env.constants";
import { getEnv } from "./env.utils";

export interface AuthBaseCredentials {
    email: string;
    password: string;
}

export function getAdminCredentials(): AuthBaseCredentials {
    return {
        email: getEnv<string>(ENV__ADMIN_EMAIL),
        password: getEnv<string>(ENV__ADMIN_PASSWORD),
    };
}

export function isAdmin({ email, password }: AuthBaseCredentials): boolean {
  const adminCredentials = getAdminCredentials();
  return adminCredentials.email === email && adminCredentials.password === password
}