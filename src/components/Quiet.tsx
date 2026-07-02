import type { FC, PropsWithChildren } from "react";

const Quiet: FC<PropsWithChildren> = ({ children }) => (
  <i className="text-subtle">{children}</i>
);

export default Quiet;
