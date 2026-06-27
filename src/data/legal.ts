export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDoc {
  title: string;
  highlight: string;
  /** Human-readable "last updated" date. */
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const CONTACT_EMAIL = "navyaedtech26@gmail.com";
const LAST_UPDATED = "18 June 2026";

export const privacyPolicy: LegalDoc = {
  title: "Privacy",
  highlight: "Policy",
  updated: LAST_UPDATED,
  intro:
    "This Privacy Policy explains how Navya EdTech (\"we\", \"us\", or \"our\") collects, uses, and protects the information you share when you visit our website or contact us. By using this site, you agree to the practices described below.",
  sections: [
    {
      heading: "1. Information We Collect",
      paragraphs: [
        "We only collect information that you choose to provide and basic technical data needed to operate and improve the site.",
      ],
      list: [
        "Contact details you submit through our forms, including your name, email address, phone number, and the project details you describe.",
        "Usage data such as pages visited, time on page, device type, browser, and approximate location, collected through analytics cookies.",
        "Technical data such as your IP address and referring website, used for security and to understand traffic sources.",
      ],
    },
    {
      heading: "2. How We Use Your Information",
      list: [
        "To respond to your enquiries and provide quotes or proposals.",
        "To deliver, maintain, and improve our services and website.",
        "To analyze traffic and understand how visitors use the site.",
        "To send you relevant updates only where you have agreed to receive them.",
        "To comply with legal obligations and prevent misuse or fraud.",
      ],
    },
    {
      heading: "3. Cookies & Analytics",
      paragraphs: [
        "We use cookies and similar technologies to run the site and to measure traffic with tools such as Google Analytics. Analytics cookies are only activated after you accept them through our cookie banner. You can decline non-essential cookies at any time, and you can clear cookies through your browser settings.",
        "Essential cookies that are required for the site to function may be set without consent.",
      ],
    },
    {
      heading: "4. Sharing Your Information",
      paragraphs: [
        "We do not sell or rent your personal information. We may share limited data with trusted service providers, such as hosting, email, and analytics platforms, strictly to operate our services, and only to the extent necessary. These providers are required to protect your data and use it only for the agreed purpose.",
        "We may also disclose information where required by law or to protect our legal rights.",
      ],
    },
    {
      heading: "5. Data Retention",
      paragraphs: [
        "We keep the information you submit only for as long as needed to respond to your enquiry, deliver our services, and meet legal or accounting requirements. When data is no longer needed, we delete or anonymize it.",
      ],
    },
    {
      heading: "6. Your Rights",
      paragraphs: [
        "You may request access to, correction of, or deletion of the personal information we hold about you. You may also object to or withdraw consent for certain processing, such as analytics or marketing. To exercise any of these rights, contact us using the details below.",
      ],
    },
    {
      heading: "7. Data Security",
      paragraphs: [
        "We apply reasonable technical and organizational measures to protect your information against unauthorized access, loss, or misuse. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "8. Third-Party Links",
      paragraphs: [
        "Our website may link to external sites, including our social media profiles. We are not responsible for the privacy practices or content of those sites, and we encourage you to review their policies.",
      ],
    },
    {
      heading: "9. Children's Privacy",
      paragraphs: [
        "Our services are intended for businesses and adults. We do not knowingly collect personal information from children. If you believe a child has provided us information, please contact us so we can remove it.",
      ],
    },
    {
      heading: "10. Changes to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The latest version will always be posted on this page with a revised \"Last updated\" date.",
      ],
    },
    {
      heading: "11. Contact Us",
      paragraphs: [
        `If you have any questions about this Privacy Policy or how your data is handled, email us at ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};

export const termsOfService: LegalDoc = {
  title: "Terms of",
  highlight: "Service",
  updated: LAST_UPDATED,
  intro:
    "These Terms of Service govern your use of the Navya EdTech website and the services we provide. By accessing this site or engaging our services, you agree to these terms. Please read them carefully.",
  sections: [
    {
      heading: "1. About Us",
      paragraphs: [
        "Navya EdTech provides website development, e-commerce, business management systems, and related digital services. These terms apply to your use of our website; specific project work is also governed by a separate proposal or agreement.",
      ],
    },
    {
      heading: "2. Use of the Website",
      paragraphs: [
        "You agree to use this website lawfully and not to misuse it in any way that could damage, disable, or impair the site or interfere with anyone else's use of it.",
      ],
      list: [
        "Do not attempt to gain unauthorized access to any part of the site or its systems.",
        "Do not submit false, misleading, or unlawful information through our forms.",
        "Do not use automated tools to scrape, overload, or disrupt the site.",
      ],
    },
    {
      heading: "3. Enquiries & Quotes",
      paragraphs: [
        "Information on this website, including service descriptions and indicative pricing, is for general guidance and does not constitute a binding offer. Any project is confirmed only through a written proposal or agreement that defines scope, timeline, and cost.",
      ],
    },
    {
      heading: "4. Intellectual Property",
      paragraphs: [
        "All content on this website, including text, graphics, logos, designs, and code, is owned by Navya EdTech or its licensors and is protected by applicable intellectual property laws. You may not copy, reproduce, or reuse it without our written permission.",
        "Ownership of deliverables produced during client projects is governed by the relevant project agreement.",
      ],
    },
    {
      heading: "5. Third-Party Services",
      paragraphs: [
        "Our website and services may rely on or link to third-party tools and platforms. We are not responsible for the availability, content, or practices of those third parties, and your use of them may be subject to their own terms.",
      ],
    },
    {
      heading: "6. Disclaimer of Warranties",
      paragraphs: [
        'This website is provided on an "as is" and "as available" basis. While we work to keep it accurate and available, we make no warranties that it will be uninterrupted, error-free, or free of harmful components.',
      ],
    },
    {
      heading: "7. Limitation of Liability",
      paragraphs: [
        "To the fullest extent permitted by law, Navya EdTech is not liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, this website. Our liability in connection with any project is limited as set out in the applicable project agreement.",
      ],
    },
    {
      heading: "8. Privacy",
      paragraphs: [
        "Your use of the website is also governed by our Privacy Policy, which explains how we handle your information. Please review it to understand our practices.",
      ],
    },
    {
      heading: "9. Changes to These Terms",
      paragraphs: [
        "We may update these Terms of Service from time to time. Continued use of the website after changes are posted means you accept the updated terms.",
      ],
    },
    {
      heading: "10. Governing Law",
      paragraphs: [
        "These terms are governed by the laws of Nepal. Any disputes arising from your use of this website will be subject to the jurisdiction of the courts of Nepal.",
      ],
    },
    {
      heading: "11. Contact Us",
      paragraphs: [
        `For any questions about these Terms of Service, email us at ${CONTACT_EMAIL}.`,
      ],
    },
  ],
};
