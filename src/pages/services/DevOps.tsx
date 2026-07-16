import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { devopsServicePage } from "@/data/servicePages/devops";

export default function DevOpsServicePage() {
  return <ServicePageTemplate data={devopsServicePage} />;
}
