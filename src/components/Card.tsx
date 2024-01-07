interface CardProps {
  label: string;
  description?: string;
  imgUrl: string;
  imgAlt: string;
  href: string;
}
const Card = ({ label, description, imgUrl, imgAlt, href }: CardProps) => (
  <a
    href={href}
    title={imgAlt}
    className="text-limed-spruce-950 group aspect-square transition-transform hover:-translate-y-0.5 focus:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
  >
    <div className="bg-limed-spruce-200 relative box-border h-full w-full overflow-hidden p-1">
      <img
        src={imgUrl}
        alt={imgAlt}
        className="bg-limed-spruce-300 saturate-60 h-full w-full max-w-none object-cover transition group-hover:saturate-100 group-focus:saturate-100"
      />
      <div className="absolute bottom-0 right-0 z-10 w-full transition-transform group-hover:-translate-y-1 group-focus:-translate-y-1 motion-reduce:transition-none">
        <div className="flex justify-end">
          <div
            className="max-w-3/4 bg-limed-spruce-200 h-6 w-fit text-ellipsis pl-3 pr-3 text-right"
            style={{ clipPath: "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            {label}
          </div>
        </div>
        <div className="bg-limed-spruce-200 h-8 w-full text-ellipsis pl-2 pr-3 text-right text-xs">
          {description}
        </div>
      </div>
    </div>
  </a>
);

export default Card;
