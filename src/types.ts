type CategoryId =
  | "structure"
  | "toiture"
  | "isolation"
  | "cloisons"
  | "electricite"
  | "plomberie"
  | "assainissement"
  | "chauffage"
  | "menuiseries"
  | "finitions"
  | "cuisine-salle-de-bains"
  | "exterieurs"
  | "preparer-chantier"
  | "techniques";
export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  topicPath?: string[];
  relatedCategories?: { category: CategoryId; topicPath: string[] }[];
  journeys?: string[];
  difficulty: "Débutant" | "Intermédiaire" | "Avancé" | null;
  durationMinutes: number | null;
  cost: { min: number; max: number; currency: "EUR" } | null;
  image: string;
  imageAlt: string;
  imageOrigin?: "original";
  imageCredit?: {
    author: string;
    license: string;
    licenseUrl: string;
    sourceUrl: string;
    originalUrl: string;
    caption: string;
    changes: string;
    accessedAt: string;
  };
  scope?: string;
  estimatesNote?: string;
  sources?: { title: string; url: string; note: string; accessedAt: string }[];
  dtuReferences?: {
    reference: string;
    title: string;
    url: string;
    scope: string;
    accessedAt: string;
  }[];
  shoppingLinks?: { material: string; retailer: string; url: string }[];
  tools: string[];
  materials: { name: string; quantity: string }[];
  steps: { title: string; description: string }[];
  mistakes: string[];
  safety: string[];
  status: "draft" | "documented" | "published";
  updatedAt: string;
}
