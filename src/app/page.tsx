import HeroExperience from "@/components/HeroExperience";
import SiteInteractions from "@/components/SiteInteractions";
import { sectionsHTML } from "@/content/sections";

/** Authored static HTML is a prototype, not untrusted CMS content. */
export default function Page() {
  return <><HeroExperience /><div dangerouslySetInnerHTML={{__html:sectionsHTML}} /><SiteInteractions /></>;
}
