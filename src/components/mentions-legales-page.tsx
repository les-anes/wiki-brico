export function MentionsLegalesPage() {
  return (
    <main className="legal container" tabIndex={-1}>
      <h1>Mentions légales</h1>

      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>wikibrico.fr</strong> est édité par :
          <br />
          <strong>Aymeric Dominique</strong> — éditeur personne physique
          <br />
          bd Voltaire, 75011 Paris, France
          <br />
          Contact :{" "}
          <a href="mailto:aymeric@encadrement-loyers.fr">
            aymeric@encadrement-loyers.fr
          </a>
        </p>
        <p>
          Responsable de la publication : <strong>Aymeric Dominique</strong>.
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par <strong>Netlify, Inc.</strong>, 44 Montgomery
          Street, Suite 300, San Francisco, CA 94104, États-Unis.
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble du contenu du site (textes, illustrations, mise en forme)
          est la propriété de son éditeur, sauf mention contraire. Toute
          reproduction, même partielle, est soumise à autorisation écrite
          préalable.
        </p>
        <p>
          Les références citées dans les tutoriels (DTU, guides, normes) sont la
          propriété de leurs éditeurs respectifs et sont citées à titre
          documentaire.
        </p>
      </section>

      <section>
        <h2>Responsabilité</h2>
        <p>
          Les tutoriels sont des contenus documentaires destinés à guider une
          réalisation et un contrôle autonome. Ils ne constituent pas une
          validation professionnelle : la sécurité des travaux (électricité,
          gaz, structure, altitude) relève des normes en vigueur et, en cas de
          doute, d’un professionnel qualifié. L’éditeur ne saurait être tenu
          responsable d’un dommage résultant de l’application du contenu.
        </p>
        <p>
          Les liens hypertextes vers des sites tiers sont fournis à titre utile
          ; leur contenu relève de la responsabilité de leurs éditeurs.
        </p>
      </section>

      <section>
        <h2>Droit applicable</h2>
        <p>
          Le présent site est soumis au droit français. En cas de litige, les
          tribunaux compétents seront ceux désignés par les règles de procédure
          applicables.
        </p>
      </section>
    </main>
  );
}
