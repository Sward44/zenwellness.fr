const title = "Projet 3D:Generateur electrique";
const url = "???";
const description =
  "Création avec Blender pour générer man modèle generateur_electrique.glb";
const author = "David";
const twitter = "@pmndrs";

export default async function Head() {
  return (
    <>
      {/* Recommended Meta Tags */}
      <meta charSet="utf-8" />
      <meta name="language" content="français" />
      <meta httpEquiv="content-type" content="text/html" />
      <meta name="author" content={author} />
      <meta name="designer" content={author} />
      <meta name="publisher" content={author} />

      {/* Search Engine Optimization Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Nouveaux programme" />
      <meta name="robots" content="index,follow" />
      <meta name="distribution" content="web" />
      {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="site" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={"/icons/share.png"} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />

      <meta
        name="viewport"
        content="width=device-width, minimum-scale=1, initial-scale=1.0"
      />
      <meta name="theme-color" content="#000" />
      <link rel="shortcut icon" href="/icons/apple-touch-icon.png" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitter} />
      <link rel="manifest" href="/manifest.json" />
    </>
  );
}
