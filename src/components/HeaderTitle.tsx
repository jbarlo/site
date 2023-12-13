import type { FC } from "react";

export interface HeaderTitleProps {
  titleColor: string;
  subdomainColor: string;
  suffix?: string;
}

const HeaderTitle: FC<HeaderTitleProps> = ({
  titleColor,
  subdomainColor,
  suffix,
}: HeaderTitleProps) => (
  <h1
    className="m-0 mb-1 mt-1 inline text-3xl font-normal leading-none"
    style={{ color: titleColor }}
  >
    <span style={{ letterSpacing: "0.15em" }}>barl</span>
    <span style={{ letterSpacing: "0.06em" }}>o</span>
    <span className="font-extralight italic" style={{ color: subdomainColor }}>
      <span
        style={{
          letterSpacing: "0.04em",
          fontSize: "1.3em",
          verticalAlign: "-12.5%",
        }}
      >
        /
      </span>
      <span>{suffix ?? "www"}</span>
    </span>
  </h1>
);

export default HeaderTitle;
