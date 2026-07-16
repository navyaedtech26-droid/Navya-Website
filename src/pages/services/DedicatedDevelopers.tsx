import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { dedicatedDevelopersServicePage } from "@/data/servicePages/dedicated-developers";

export default function DedicatedDevelopersServicePage() {
  return <ServicePageTemplate data={dedicatedDevelopersServicePage} />;
}
