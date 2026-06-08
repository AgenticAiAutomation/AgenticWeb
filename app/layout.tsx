import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
  weight: ["300", "400", "500"],
});

const BASE_URL = "https://agenticaiautomation.co";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Agentic AI Automation | AI Workflow Automation Agency",
    template: "%s | Agentic AI Automation",
  },
  description:
    "Enterprise-grade AI automation services. We deploy AI agents, intelligent workflows, and agentic systems that eliminate manual operations and compound your business output.",
  keywords: [
    "Agentic AI Automation",
    "AI Workflow Automation",
    "AI Automation Services",
    "AI Agents for Business",
    "Intelligent Process Automation",
    "Workflow Automation Agency",
    "AI Operations Automation",
    "AI recruiting automation",
    "AI lead generation",
    "AI support agents",
  ],
  authors: [{ name: "Agentic AI Automation", url: BASE_URL }],
  creator: "Agentic AI Automation",
  publisher: "Agentic AI Automation",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Agentic AI Automation",
    title: "Agentic AI Automation | AI Workflow Automation Agency",
    description:
      "Enterprise AI agents and intelligent automation workflows. Eliminate manual operations. Scale with precision.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Agentic AI Automation - Enterprise AI Workflow Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic AI Automation | AI Workflow Automation Agency",
    description:
      "Enterprise AI agents and intelligent automation workflows. Eliminate manual operations. Scale with precision.",
    images: ["/og-image.jpg"],
    creator: "@agenticai",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#050508" },
    { media: "(prefers-color-scheme: dark)", color: "#050508" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agentic AI Automation",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "Contact@agenticAiAutomation.co",
    contactType: "Customer Service",
    availableLanguage: ["English"],
  },
  sameAs: [],
  description:
    "Enterprise AI automation agency specializing in agentic AI workflows, intelligent process automation, and AI agent deployment for global businesses.",
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Agentic AI Automation",
  url: BASE_URL,
  description:
    "Enterprise-grade AI workflow automation services including AI agents, recruitment automation, lead generation automation, and AI support agents.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Automation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Workflow Automation",
          description:
            "End-to-end intelligent workflow design and deployment using AI agents.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Recruitment Automation",
          description:
            "AI-powered talent sourcing, screening, and pipeline management.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Lead Generation Automation",
          description:
            "Automated AI-driven lead sourcing, qualification, and CRM enrichment.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Support Agents",
          description:
            "24/7 intelligent support automation via voice and chat AI agents.",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is agentic AI automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agentic AI automation uses autonomous AI agents that perceive, reason, and act across your business systems without constant human direction. Unlike rule-based automation, AI agents adapt to context and handle complex, multi-step workflows.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to implement AI automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most core workflow automations are live within 2–4 weeks. Complex multi-system agentic deployments typically take 6–10 weeks depending on integration depth and data readiness.",
      },
    },
    {
      "@type": "Question",
      name: "What ROI can I expect from AI automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Clients typically see 60–80% reduction in manual task hours within the first 90 days. ROI depends on workflow complexity and volume, but most engagements pay back within 3–6 months.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need technical infrastructure to use your services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We handle the full stack — from infrastructure selection and API integrations to agent design, testing, and deployment. You provide access; we build and maintain.",
      },
    },
    {
      "@type": "Question",
      name: "Which industries do you serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We serve clients globally across financial services, recruitment, e-commerce, SaaS, real estate, healthcare operations, and professional services.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
