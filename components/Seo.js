import Head from 'next/head';

const Seo = ({
  title = "Sampreet Patil | Software Developer",
  description = "A CS grad who likes turning abstract problems into clean, scalable code, specializing in AI & Machine Learning.",
  imageUrl = "https://www.sampreetpatil.com/logo-square.png",
  url = "https://www.sampreetpatil.com",
  keywords = "Sampreet Patil, Software Developer, AI & Machine Learning, GenAI, Backend Developer, Next.js, Multimodal AI, Portfolio"
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sampreet Patil",
    "url": "https://www.sampreetpatil.com",
    "image": "https://www.sampreetpatil.com/favicon.ico",
    "sameAs": [
      "https://www.linkedin.com/in/sampreet-patil-681015264/",
      "https://github.com/IDKSAM27",
      "https://x.com/OG_Sampreet",
      "https://www.reddit.com/user/IDKSAM27/"
    ],
    "jobTitle": "Software Developer",
    "description": description
  };

  return (
    <Head>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
      <meta name="google-site-verification" content="dxiggl1L_V-jwxh9yNKEvRRJzokYTC-uDK4S7g1AWF8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="1280" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};

export default Seo;
