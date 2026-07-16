import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { crmSystemsServicePage } from "@/data/servicePages/crm-systems";

export default function CrmSystemsSolutionPage() {
  return <ServicePageTemplate data={crmSystemsServicePage} />;
}
