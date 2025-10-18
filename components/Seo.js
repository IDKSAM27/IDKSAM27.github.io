// components/Seo.js
import Head from 'next/head';

const Seo = ({
  title = "Sampreet Patil | Software Developer",
  description = "A CS grad who likes turning abstract problems into clean, scalable code, I also write about it on my blog.",
  imageUrl = "https://www.sampreetpatil.com/public/og-image.png", // IMPORTANT: Create and place an image here
  url = "https://www.sampreetpatil.com"
}) => {
  return (
    <Head>
      {/* Standard SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
    </Head>
  );
};

export default Seo;
