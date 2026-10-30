import { getLexicon,parseLevel } from "@/data/lexicon";
import { getMission } from "@/data/missions";
import { createChecks } from "@/domain/check-definitions";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(request:Request){
 const query=new URL(request.url).searchParams;
 const level=parseLevel(query.get("level"));
 if(!level||query.getAll("level").length!==1||[...query.keys()].some(key=>key!=="level"))return Response.json({code:"INVALID_LEVEL",message:"Choose A2, B1, B2 or C1.",retryable:false},{status:400});
 try{const mission=getMission(level);return Response.json({mission,checks:createChecks(mission,getLexicon(level).records)},{headers:{"Cache-Control":"public, max-age=0, must-revalidate"}});}
 catch{return Response.json({code:"SOURCE_UNAVAILABLE",message:"This source mission is unavailable. Continue lexicon study or try again.",retryable:true},{status:503});}
}
