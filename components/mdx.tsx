import type { MDXComponents } from "mdx/types";

// Shared MDX render components. Content images get lazy-loading + async decoding
// to cut Largest-Contentful-Paint / layout shift on long articles and book chapters.
export const mdxComponents: MDXComponents = {
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      {...props}
      loading="lazy"
      decoding="async"
      alt={props.alt ?? ""}
      className="rounded-md"
    />
  ),
  a: (props) => (
    <a
      {...props}
      {...(props.href?.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    />
  ),
};
