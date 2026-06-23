import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import LegalLayout from "@/components/legal/LegalLayout";
import { termsOfService } from "@/data/legal";
import { breadcrumbSchema } from "@/lib/structuredData";

export default function Terms() {
  return (
    <PageTransition>
      <Seo
        title="Terms of Service | Navya EdTech"
        description="The terms that govern your use of the Navya EdTech website and services."
        path="/terms"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <LegalLayout doc={termsOfService} />
    </PageTransition>
  );
}
