import {LearningApp} from "@/components/LearningApp";
import {readAuthConfiguration} from "@/auth/policy";
export default function Page(){return <LearningApp accountConfiguration={readAuthConfiguration()}/>;}
