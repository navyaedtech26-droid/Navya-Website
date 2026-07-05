import { schoolsIndustryPage } from "./schools";
import { collegesIndustryPage } from "./colleges";
import { hospitalsIndustryPage } from "./hospitals";
import { manufacturingIndustryPage } from "./manufacturing";
import { hotelsIndustryPage } from "./hotels";
import { restaurantsIndustryPage } from "./restaurants";
import { retailIndustryPage } from "./retail";
import { ngosIndustryPage } from "./ngos";
import { realEstateIndustryPage } from "./real-estate";
import { travelAgenciesIndustryPage } from "./travel-agencies";
import type { IndustryPage } from "@/types";

export {
  schoolsIndustryPage,
  collegesIndustryPage,
  hospitalsIndustryPage,
  manufacturingIndustryPage,
  hotelsIndustryPage,
  restaurantsIndustryPage,
  retailIndustryPage,
  ngosIndustryPage,
  realEstateIndustryPage,
  travelAgenciesIndustryPage,
};

/** Every dedicated industry page, in homepage/nav display order. */
export const industryPages: IndustryPage[] = [
  schoolsIndustryPage,
  collegesIndustryPage,
  hospitalsIndustryPage,
  manufacturingIndustryPage,
  hotelsIndustryPage,
  restaurantsIndustryPage,
  retailIndustryPage,
  ngosIndustryPage,
  realEstateIndustryPage,
  travelAgenciesIndustryPage,
];
