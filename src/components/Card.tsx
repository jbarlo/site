import type { FC, PropsWithChildren } from "react";

interface CardProps {
  className?: string;
}
const Card: FC<CardProps> = ({
  children,
  className,
}: PropsWithChildren<CardProps>) => (
  <div className={`bg-limed-spruce-700 box-border ${className ?? ""}`}>
    {children}
  </div>
);

export default Card;
