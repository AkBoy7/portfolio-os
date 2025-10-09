import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Akam Bilbas - Software Engineer & Back-End Developer",
  description = "Portfolio of Akam Bilbas, a passionate Software Engineer and Back-End Developer specializing in modern web technologies.",
  image = "https://akambilbas.me/og-image.jpg",
  url = "https://akambilbas.me/",
  type = "website",
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(
        `meta[property="${property}"]`
      ) as HTMLMetaElement;
      if (!element) {
        element = document.querySelector(
          `meta[name="${property}"]`
        ) as HTMLMetaElement;
      }
      if (element) {
        element.content = content;
      }
    };

    updateMetaTag("description", description);
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", image);
    updateMetaTag("og:url", url);
    updateMetaTag("og:type", type);
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("twitter:url", url);

    // Update canonical link
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (canonical) {
      canonical.href = url;
    }
  }, [title, description, image, url, type]);

  return null;
};
