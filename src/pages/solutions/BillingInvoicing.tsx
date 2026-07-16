import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import { billingInvoicingServicePage } from "@/data/servicePages/billing-invoicing";

export default function BillingInvoicingSolutionPage() {
  return <ServicePageTemplate data={billingInvoicingServicePage} />;
}
