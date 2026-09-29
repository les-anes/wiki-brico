export function ConfidentialitePage() {
  return (
    <main className="legal container" tabIndex={-1}>
      <h1>Politique de confidentialité</h1>

      <section>
        <h2>Responsable du traitement</h2>
        <p>
          Le responsable du traitement est <strong>Aymeric Dominique</strong>{" "}
          (contact :{" "}
          <a href="mailto:aymeric@encadrement-loyers.fr">
            aymeric@encadrement-loyers.fr
          </a>
          ). Le site ne désigne pas de délégué à la protection des données, le
          suivi à grande échelle et les données sensibles étant exclus de son
          activité.
        </p>
      </section>

      <section>
        <h2>Données traitées et finalités</h2>
        <p>
          <strong>Mesure d’audience (Google Analytics 4).</strong> Des données
          de consultation (pages vues, provenance, type d’appareil, durée de
          visite) sont traitées uniquement pour produire des statistiques de
          fréquentation. <strong>Base légale : votre consentement</strong> (Art.
          6(1)(a) RGPD et directive ePrivacy). Sans accord explicite, aucun
          outil de mesure n’est chargé.
        </p>
        <p>
          <strong>Favoris.</strong> Les tutoriels que vous enregistrez sont
          conservés dans le stockage local de votre navigateur (localStorage).
          Ces données ne quittent pas votre appareil et ne sont pas accessibles
          au responsable du site ; les effacer relève des réglages de votre
          navigateur.
        </p>
        <p>
          <strong>Journaux techniques de l’hébergeur.</strong> Netlify traite
          des données de connexion (adresse IP, date, ressource demandée) pour
          assurer la sécurité et la disponibilité du service. Base légale :
          intérêt légitime au fonctionnement du site (Art. 6(1)(f) RGPD).
        </p>
      </section>

      <section>
        <h2>Cookies et stockage local</h2>
        <p>
          Le site ne dépose aucun cookie publicitaire ni de traceur avant votre
          choix. Le script de mesure n’est chargé qu’après acceptation ; le
          refus est enregistré dans le stockage local de votre navigateur pour
          ne pas vous le redemander.
        </p>
        <p>
          Vous pouvez modifier ou retirer votre choix à tout moment via le lien{" "}
          <strong>« Gérer les cookies »</strong> en pied de page. Le retrait est
          aussi simple que l’accord (Art. 7(3) RGPD).
        </p>
      </section>

      <section>
        <h2>Durées de conservation</h2>
        <ul>
          <li>
            Mesure d’audience : 2 mois à compter de la collecte (durée de
            rétention réglée dans la propriété Google Analytics, à vérifier à la
            mise en ligne).
          </li>
          <li>
            Journaux techniques de l’hébergeur : conservés par Netlify pour la
            durée nécessaire à la sécurité et à la mise à disposition du
            service, selon la politique de cet hébergeur.
          </li>
          <li>
            Favoris et choix de consentement : conservés dans votre navigateur
            jusqu’à leur effacement par vous.
          </li>
        </ul>
      </section>

      <section>
        <h2>Destinataires et transferts</h2>
        <p>
          Les données de mesure sont traitées par Google LLC en qualité de
          sous-traitant (Art. 28 RGPD), dans le cadre du contrat Google
          Analytics. Elles peuvent être transférées aux États-Unis au titre de
          la décision d’adéquation UE–US Data Privacy Framework, complétée par
          les clauses contractuelles types de la Commission européenne (Art.
          46(2)(c) RGPD) comme mécanisme de repli. Aucune donnée n’est vendue ni
          utilisée à des fins publicitaires.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Vous disposez des droits d’accès, de rectification, d’effacement, de
          limitation, d’opposition et de portabilité (Art. 15–22 RGPD). Pour les
          exercer, écrivez à{" "}
          <a href="mailto:aymeric@encadrement-loyers.fr">
            aymeric@encadrement-loyers.fr
          </a>{" "}
          : la réponse vous est adressée dans un délai d’un mois (Art. 12(3)).
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL — 3
          place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — ou sur{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
            cnil.fr
          </a>{" "}
          (Art. 77 RGPD).
        </p>
      </section>
    </main>
  );
}
