import type { FC, PropsWithChildren } from "react";
import palette from "../palette";

interface CardProps {
  className?: string;
}
const Card: FC<CardProps> = ({
  children,
  className,
}: PropsWithChildren<CardProps>) => (
  <div
    className={`box-border p-5 ${className ?? ""}`}
    style={{ backgroundColor: palette.card }}
  >
    {children}
  </div>
);

export default Card;
