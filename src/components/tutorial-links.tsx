import { ArrowRight } from "lucide-react";

import { tutorials } from "@/data";
import { duration } from "@/lib/catalog";
import { tutorialPath } from "@/lib/routes";

/** Les identifiants et leur ordre éditorial sont contrôlés avant le build. */
export function TutorialLinks({ ids }: { ids: string[] }) {
  return (
    <ul className="tutorial-links">
      {ids.map((id) => {
        const tutorial = tutorials.find((t) => t.id === id)!;
        return (
          <li key={id}>
            <a href={tutorialPath(id)}>
              <span>
                <strong>{tutorial.title}</strong>
                <small>
                  {tutorial.difficulty} · {duration(tutorial.durationMinutes)}
                </small>
              </span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
