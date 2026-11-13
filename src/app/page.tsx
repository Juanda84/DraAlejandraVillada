import SiteInteractions from "@/components/SiteInteractions";
import { sectionsHTML } from "@/content/sections";
/** Static authored markup. No untrusted user or CMS HTML is injected. */
export default function Page(){ return <><div dangerouslySetInnerHTML={{__html:sectionsHTML}}/><div className="grain" aria-hidden="true"/><SiteInteractions/></>; }
