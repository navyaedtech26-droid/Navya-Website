import { websitesServicePage } from "./websites";
import { customSoftwareDevelopmentServicePage } from "./custom-software-development";
import { mobileAppDevelopmentServicePage } from "./mobile-app-development";
import { aiSolutionsServicePage } from "./ai-solutions";
import { cloudServicesServicePage } from "./cloud-services";
import { uiUxDesignServicePage } from "./ui-ux-design";
import { devopsServicePage } from "./devops";
import { itConsultingServicePage } from "./it-consulting";
import { dedicatedDevelopersServicePage } from "./dedicated-developers";
import { digitalTransformationServicePage } from "./digital-transformation";
import { legacySystemModernizationServicePage } from "./legacy-system-modernization";
import { erpSystemsServicePage } from "./erp-systems";
import { crmSystemsServicePage } from "./crm-systems";
import { billingInvoicingServicePage } from "./billing-invoicing";
import { learningManagementSystemsServicePage } from "./learning-management-systems";
import { inventoryManagementServicePage } from "./inventory-management";
import { businessIntelligenceAnalyticsServicePage } from "./business-intelligence-analytics";
import { cloudDevOpsServicePage } from "./cloud-devops";
import { socialMediaGrowthServicePage } from "./social-media-growth";
import type { ServicePage } from "@/types";

/** Every /services/:slug page ("category: service"), in nav display order. */
export const servicePages: ServicePage[] = [
  customSoftwareDevelopmentServicePage,
  websitesServicePage,
  mobileAppDevelopmentServicePage,
  aiSolutionsServicePage,
  cloudServicesServicePage,
  uiUxDesignServicePage,
  devopsServicePage,
  itConsultingServicePage,
  dedicatedDevelopersServicePage,
];

/** Every /solutions/:slug page ("category: solution"), in nav display order. */
export const solutionPages: ServicePage[] = [
  digitalTransformationServicePage,
  legacySystemModernizationServicePage,
  erpSystemsServicePage,
  crmSystemsServicePage,
  billingInvoicingServicePage,
  learningManagementSystemsServicePage,
  inventoryManagementServicePage,
  businessIntelligenceAnalyticsServicePage,
  cloudDevOpsServicePage,
  socialMediaGrowthServicePage,
];
