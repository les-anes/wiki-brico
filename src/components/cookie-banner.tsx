import { Button } from "@/components/ui/button";
import type { ConsentState } from "@/lib/consent";

/**
 * Bandeau de consentement : pré-rendu visible dans le HTML (pas de flash, pas
 * de diff d’hydratation), masqué côté client quand le choix est déjà tranché.
 * Aucun blocage de la navigation : le site reste utilisable sans consentement.
 */
export function CookieBanner({
  visible,
  current,
  onDecide,
}: {
  visible: boolean;
  current: ConsentState | null;
  onDecide: (state: ConsentState) => void;
}) {
  if (!visible) return null;
  return (
    <section
      className="cookie-banner"
      aria-label="Consentement à la mesure d’audience"
    >
      <p>
        {current === "granted" && "Choix actuel : mesure d’audience acceptée. "}
        {current === "denied" && "Choix actuel : mesure d’audience refusée. "}
        Ce site utilise Google Analytics pour mesurer sa fréquentation. Rien
        n’est chargé sans votre accord.{" "}
        <a href="/confidentialite/">En savoir plus</a>
      </p>
      <div className="cookie-banner-actions">
        <Button size="sm" onClick={() => onDecide("granted")}>
          Accepter
        </Button>
        <Button size="sm" onClick={() => onDecide("denied")}>
          Refuser
        </Button>
      </div>
    </section>
  );
}
