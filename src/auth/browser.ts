import {createBrowserClient} from "@supabase/ssr";
import type {AuthConfiguration} from "./policy";
/** Construct only after the separate account configuration has been authorized. */
export function createBrowserAuth(config:AuthConfiguration|null){
 if(!config)return null;
 return createBrowserClient(config.url,config.publishableKey,{auth:{flowType:"pkce",detectSessionInUrl:false},cookieOptions:{path:"/",sameSite:"lax",secure:true}});
}
