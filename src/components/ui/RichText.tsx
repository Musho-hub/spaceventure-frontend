import DOMPurify from "isomorphic-dompurify";

type RichTextProps = {
  html: string;
  className?: string;
};

export default function RichText({ html, className = "" }: RichTextProps) {
  const cleanHtml = DOMPurify.sanitize(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
