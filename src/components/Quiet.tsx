import type { FC, PropsWithChildren } from "react";
import palette from "../palette";

export interface QuietProps {}
const Quiet: FC<QuietProps> = ({ children }: PropsWithChildren<QuietProps>) => (
  <i style={{ color: palette.subtle }}>{children}</i>
);

export default Quiet;
