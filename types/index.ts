export type Service = {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  duration: string;
  priceRange: string;
  highlights: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
  image: string;
};
