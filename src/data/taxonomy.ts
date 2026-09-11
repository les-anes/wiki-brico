import {
  Bath,
  ClipboardList,
  DoorOpen,
  Droplets,
  Hammer,
  House,
  Layers3,
  PaintRoller,
  ShieldCheck,
  Trees,
  Waves,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";

import categoryData from "./categories.json";
export { default as journeys } from "./journeys.json";
const icons = {
  Bath,
  ClipboardList,
  DoorOpen,
  Droplets,
  Hammer,
  House,
  Layers3,
  PaintRoller,
  ShieldCheck,
  Trees,
  Waves,
  Wind,
  Wrench,
  Zap,
};
export const categories = categoryData.map((category) =>
  Object.assign({}, category, {
    icon: icons[category.icon as keyof typeof icons],
  }),
);
export const navigationCategories = [
  "plomberie",
  "electricite",
  "structure",
  "menuiseries",
  "finitions",
]
  .map((id) => categories.find((c) => c.id === id)!)
  .concat(
    categories.filter(
      (c) =>
        ![
          "plomberie",
          "electricite",
          "structure",
          "menuiseries",
          "finitions",
        ].includes(c.id),
    ),
  );
