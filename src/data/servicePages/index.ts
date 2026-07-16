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
import { erpSystemsServicePage } from "./erp-systems";
import { crmSystemsServicePage } from "./crm-systems";
import { billingInvoicingServicePage } from "./billing-invoicing";
import { learningManagementSystemsServicePage } from "./learning-management-systems";
import { inventoryManagementServicePage } from "./inventory-management";
import { businessIntelligenceAnalyticsServicePage } from "./business-intelligence-analytics";
import { cloudDevOpsServicePage } from "./cloud-devops";
import { socialMediaGrowthServicePage } from "./social-media-growth";
import type { ServicePage } from "@/types";

export {
  websitesServicePage,
  customSoftwareDevelopmentServicePage,
  mobileAppDevelopmentServicePage,
  aiSolutionsServicePage,
  cloudServicesServicePage,
  uiUxDesignServicePage,
  devopsServicePage,
  itConsultingServicePage,
  dedicatedDevelopersServicePage,
  digitalTransformationServicePage,
  erpSystemsServicePage,
  crmSystemsServicePage,
  billingInvoicingServicePage,
  learningManagementSystemsServicePage,
  inventoryManagementServicePage,
  businessIntelligenceAnalyticsServicePage,
  cloudDevOpsServicePage,
  socialMediaGrowthServicePage,
};

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
  erpSystemsServicePage,
  crmSystemsServicePage,
  billingInvoicingServicePage,
  learningManagementSystemsServicePage,
  inventoryManagementServicePage,
  businessIntelligenceAnalyticsServicePage,
  cloudDevOpsServicePage,
  socialMediaGrowthServicePage,
];

/** All service + solution pages combined, useful for slug lookups. */
export const allServicePages: ServicePage[] = [...servicePages, ...solutionPages];
