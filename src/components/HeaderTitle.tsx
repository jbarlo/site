import type { FC } from "react";
import "@fontsource/barlow";

export interface HeaderTitleProps {
  suffix?: string;
}

const HeaderTitle: FC<HeaderTitleProps> = ({ suffix }: HeaderTitleProps) => (
  <h1 className="m-0 mb-1 mt-1 inline text-3xl font-normal leading-none text-title">
    <span
      style={{
        letterSpacing: "0.1em",
        fontFamily: "Barlow, sans-serif",
      }}
    >
      barl
    </span>
    <span
      style={{
        letterSpacing: "0.06em",
        fontFamily: "Barlow, sans-serif",
      }}
    >
      o
    </span>
    <span className="font-extralight italic text-subdomain">
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
