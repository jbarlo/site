import type { FC } from "react";

interface IntroCardProps {
  backgroundColor: string;
  subdomainColor: string;
  subtitleColor: string;
}
const IntroCard: FC<IntroCardProps> = ({
  backgroundColor,
  subdomainColor,
  subtitleColor,
}: IntroCardProps) => (
  <div
    className="top-20 box-border h-44 p-5 sm:sticky"
    style={{ backgroundColor }}
  >
    <div className="flex justify-between gap-2">
      <div className="flex flex-col justify-between">
        <div className="text-2xl">
          james barlo<span style={{ color: subdomainColor }}>w</span>
        </div>
        <div
          className="pt-2 text-lg leading-5"
          style={{ color: subtitleColor }}
        >
          <div>developer</div>
        </div>
      </div>
      <div
        className="aspect-square h-24 rounded-full"
        style={{ backgroundColor: "darkcyan" }}
      />
    </div>
  </div>
);

export default IntroCard;
