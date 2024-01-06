import type { FC, PropsWithChildren } from "react";

export interface QuietProps {}
const Quiet: FC<QuietProps> = ({ children }: PropsWithChildren<QuietProps>) => (
  <i className="text-subtle">{children}</i>
);

export default Quiet;
