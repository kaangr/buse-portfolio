"use client";

import { socialLinks } from "@/data/projects";
import {
  InstagramIcon,
  InstagramIconSolid,
  LinkedInIcon,
  LinkedInIconSolid,
  PinterestIcon,
  PinterestIconSolid,
} from "@/components/social/social-icons";
import { SocialIconButton } from "@/components/social/SocialIconButton";
import { copy } from "@/content/copy";

const items = [
  {
    key: "instagram" as const,
    label: "Instagram",
    href: socialLinks.instagram,
    icon: <InstagramIcon />,
    iconHover: <InstagramIconSolid />,
  },
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    href: socialLinks.linkedin,
    icon: <LinkedInIcon />,
    iconHover: <LinkedInIconSolid />,
  },
  {
    key: "pinterest" as const,
    label: "Pinterest",
    href: socialLinks.pinterest,
    icon: <PinterestIcon />,
    iconHover: <PinterestIconSolid />,
  },
];

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {

  return (
    <div className={className}>
      <p className="text-gallery-offwhite/50 mb-4 text-xs tracking-[0.3em] uppercase">
        {copy.footer.social}
      </p>
      <div className="flex flex-wrap gap-4">
        {items.map((item) => (
          <SocialIconButton
            key={item.key}
            variant={item.key}
            href={item.href}
            label={item.label}
            icon={item.icon}
            iconHover={item.iconHover}
          />
        ))}
      </div>
    </div>
  );
}
