import type { FC, PropsWithChildren } from "react";

interface CardProps {
  className?: string;
}
const Card: FC<CardProps> = ({
  children,
  className,
}: PropsWithChildren<CardProps>) => (
  <div className={`bg-card box-border p-5 ${className ?? ""}`}>{children}</div>
);

export default Card;
