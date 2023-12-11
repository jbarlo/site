import type { FC } from "react";

export interface HoverableLinkProps {
  currUrl: string;
  toUrl: string;
  title: string;
}

const HoverableLink: FC<HoverableLinkProps> = ({ currUrl, toUrl, title }) => (
  <a
    className={`text-xl hover:underline ${
      currUrl === toUrl ? "underline" : ""
    }`}
    href={toUrl}
  >
    {title}
  </a>
);

export default HoverableLink;
