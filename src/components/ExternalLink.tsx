import type { FC, PropsWithChildren } from "react";

export interface ExternalLinkProps {
  href: string;
}
const ExternalLink: FC<ExternalLinkProps> = ({
  href,
  children,
}: PropsWithChildren<ExternalLinkProps>) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default ExternalLink;
