import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { cloudServicesServicePage } from "@/data/servicePages/cloud-services";

export default function CloudServicesServicePage() {
  return <ServicePageTemplate data={cloudServicesServicePage} />;
}
