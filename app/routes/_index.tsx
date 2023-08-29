import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    // { title: "New Remix App" },
  ];
};

export default function Index() {
  return (
    <div style={{ lineHeight: "1.8" }}>
      <h1>
        <span>
          barlo<span style={{ color: "gray", fontStyle: "italic" }}>/www</span>
        </span>
      </h1>
      <h1>
        <span>
          barlo<span style={{ color: "gray", fontStyle: "italic" }}>/g</span>
        </span>
      </h1>
    </div>
  );
}
