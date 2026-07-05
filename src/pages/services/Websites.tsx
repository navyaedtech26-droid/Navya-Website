import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { websitesServicePage } from "@/data/servicePages/websites";

export default function WebsitesServicePage() {
  return <ServicePageTemplate data={websitesServicePage} />;
}
