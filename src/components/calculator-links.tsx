import { ArrowRight } from "lucide-react";

import { calculatorPath } from "@/lib/routes";
import type { CalculatorDefinition } from "@/types";

export function CalculatorLinks({ tools }: { tools: CalculatorDefinition[] }) {
  return (
    <ul className="tutorial-links calculator-links">
      {tools.map((tool) => (
        <li key={tool.slug}>
          <a href={calculatorPath(tool.slug)}>
            <span>
              <strong>{tool.title}</strong>
              <small>Calculateur · {tool.heading}</small>
            </span>
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
