export const KNOWN_PRODUCTION_ORIGINS: readonly string[];
export function getAllowedAppOrigin(raw:string,allowedOrigins?:readonly string[]):string;
export function getAuthRedirectUrl(raw:string,path:"/auth/callback"|"/auth/reset",allowedOrigins?:readonly string[]):string;
export function authErrorText(error:{code?:string;message?:string}|null|undefined):string;
export function safeOriginsFromConfig(raw:string|undefined,isDevelopment?:boolean):string[];
