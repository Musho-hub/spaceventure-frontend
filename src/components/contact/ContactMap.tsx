"use client";

import dynamic from "next/dynamic";

const ContactMapClient = dynamic(() => import("./ContactMapClient"), {
  ssr: false,
});

type ContactMapProps = {
  coordinates: string;
  name: string;
  address: string;
};

export default function ContactMap(props: ContactMapProps) {
  return <ContactMapClient {...props} />;
}
