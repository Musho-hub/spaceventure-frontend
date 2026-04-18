import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";

const socialLinks = [
  { href: "#", icon: <FaFacebookF />, label: "Facebook" },
  { href: "#", icon: <FaTwitter />, label: "Twitter" },
  { href: "#", icon: <FaGooglePlusG />, label: "Google Plus" },
  { href: "#", icon: <FaInstagram />, label: "Instagram" },
];

type SocialLinksProps = {
  className?: string;
  linkClassName?: string;
};

export default function SocialLinks({
  className = "",
  linkClassName = "",
}: SocialLinksProps) {
  return (
    <article className={className}>
      {socialLinks.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-label={item.label}
          className={linkClassName}
        >
          {item.icon}
        </Link>
      ))}
    </article>
  );
}
