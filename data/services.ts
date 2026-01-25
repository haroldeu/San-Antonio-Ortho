import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "svc-1",
    slug: "preventive-care",
    title: "Preventive Care & Cleanings",
    category: "Preventive",
    shortDescription: "Gentle cleanings, fluoride, and education for long-term oral health.",
    description:
      "Our preventive visits keep teeth strong and gums healthy through professional cleanings, detailed exams, and proactive guidance.",
    duration: "45-60 minutes",
    priceRange: "PHP 1,200 - 2,500",
    highlights: ["Digital checkup", "Gentle scaling", "Personalized hygiene plan"]
  },
  {
    id: "svc-2",
    slug: "tooth-colored-fillings",
    title: "Tooth-Colored Fillings",
    category: "Restorative",
    shortDescription: "Natural-looking restorations that blend seamlessly with your smile.",
    description:
      "We restore cavities with durable, tooth-colored materials for a comfortable bite and natural finish.",
    duration: "30-60 minutes",
    priceRange: "PHP 1,800 - 3,500",
    highlights: ["Shade-matched", "Minimally invasive", "Long-lasting"]
  },
  {
    id: "svc-3",
    slug: "gentle-extractions",
    title: "Gentle Extractions",
    category: "Surgical",
    shortDescription: "Comfort-focused extractions with clear aftercare guidance.",
    description:
      "We use modern techniques to ensure safe, smooth extractions while keeping you comfortable throughout the visit.",
    duration: "30-90 minutes",
    priceRange: "PHP 2,500 - 6,000",
    highlights: ["Comfort-first approach", "Clear aftercare", "Pain management"]
  },
  {
    id: "svc-4",
    slug: "aesthetic-whitening",
    title: "Aesthetic Whitening",
    category: "Cosmetic",
    shortDescription: "Brighten your smile safely with in-clinic whitening options.",
    description:
      "Customized whitening protocols lift stains and boost confidence while protecting enamel.",
    duration: "60-90 minutes",
    priceRange: "PHP 4,000 - 8,000",
    highlights: ["Low-sensitivity", "Fast results", "Customized trays"]
  },
  {
    id: "svc-5",
    slug: "crowns-bridges",
    title: "Crowns & Bridges",
    category: "Restorative",
    shortDescription: "Restore strength and shape with premium prosthetics.",
    description:
      "Our crowns and bridges repair damaged teeth and fill gaps for a stable, beautiful bite.",
    duration: "2 visits",
    priceRange: "PHP 8,000 - 20,000",
    highlights: ["Natural aesthetics", "Precision fit", "Durable materials"]
  },
  {
    id: "svc-6",
    slug: "orthodontic-consults",
    title: "Orthodontic Consultations",
    category: "Orthodontics",
    shortDescription: "Guidance for braces or aligners tailored to your goals.",
    description:
      "We assess alignment and provide clear treatment plans for teens and adults.",
    duration: "45 minutes",
    priceRange: "PHP 1,500 - 2,000",
    highlights: ["Detailed assessment", "Flexible options", "Progress tracking"]
  }
];

export const serviceCategories = [
  "All",
  "Preventive",
  "Restorative",
  "Cosmetic",
  "Surgical",
  "Orthodontics"
];
