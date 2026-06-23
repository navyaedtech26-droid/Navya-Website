import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import LegalLayout from "@/components/legal/LegalLayout";
import { privacyPolicy } from "@/data/legal";
import { breadcrumbSchema } from "@/lib/structuredData";

export default function PrivacyPolicy() {
  return (
    <PageTransition>
      <Seo
        title="Privacy Policy | Navya EdTech"
        description="How Navya EdTech collects, uses, and protects your personal information, including cookies and analytics."
        path="/privacy-policy"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <LegalLayout doc={privacyPolicy} />
    </PageTransition>
  );
}
