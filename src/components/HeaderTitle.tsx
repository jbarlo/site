export interface HeaderTitleProps {
  titleColor: string;
  subdomainColor: string;
}

const HeaderTitle: FC<HeaderTitleProps> = ({
  titleColor,
  subdomainColor,
}: HeaderTitleProps) => (
  <h1
    className="m-0 mb-2 ml-5 mt-1 text-4xl font-normal leading-none"
    style={{ color: titleColor }}
  >
    <span style={{ letterSpacing: "0.15em" }}>barlo</span>
    <span className="font-extralight italic" style={{ color: subdomainColor }}>
      <span
        style={{
          letterSpacing: "0.1em",
          fontSize: "1.3em",
          verticalAlign: "-12.5%",
        }}
      >
        /
      </span>
      <span>www</span>
    </span>
  </h1>
);

export default HeaderTitle;
