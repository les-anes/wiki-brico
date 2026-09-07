export type CategoryId =
  | "plomberie"
  | "electricite"
  | "maconnerie"
  | "menuiserie"
  | "peinture"
  | "revetements"
  | "charpente"
  | "toiture";
export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  difficulty: "Débutant" | "Intermédiaire" | "Avancé";
  durationMinutes: number;
  cost: { min: number; max: number; currency: "EUR" };
  image: string;
  imageAlt: string;
  tools: string[];
  materials: { name: string; quantity: string }[];
  steps: { title: string; description: string }[];
  mistakes: string[];
  safety: string[];
  status: "draft" | "published";
  updatedAt: string;
}
