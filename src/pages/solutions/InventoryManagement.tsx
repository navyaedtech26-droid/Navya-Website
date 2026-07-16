import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { inventoryManagementServicePage } from "@/data/servicePages/inventory-management";

export default function InventoryManagementSolutionPage() {
  return <ServicePageTemplate data={inventoryManagementServicePage} />;
}
