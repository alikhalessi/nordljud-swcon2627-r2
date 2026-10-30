import { getLexicon,parseLevel } from "@/data/lexicon";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(request:Request){
 const query=new URL(request.url).searchParams;
 const level=parseLevel(query.get("level"));
 if(!level||query.getAll("level").length!==1||[...query.keys()].some(key=>key!=="level"))return Response.json({code:"INVALID_LEVEL",message:"Choose A2, B1, B2 or C1.",retryable:false},{status:400});
 try{return Response.json(getLexicon(level),{headers:{"Cache-Control":"public, max-age=0, must-revalidate"}});}
 catch{return Response.json({code:"SOURCE_UNAVAILABLE",message:"Teaching content is unavailable. Try again; no replacement content has been invented.",retryable:true},{status:503});}
}
