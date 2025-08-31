import { useWindowWidth } from "../hooks/useWindowWidth.ts";
import type { FunctionComponent } from "preact";

interface Props {
  src?: string;
  alt?: string;
}

export const BannerImage: FunctionComponent<Props> = ({ src, alt }) => {
  console.log(src);

  const width = useWindowWidth();

  if (!src) return null;

  return (
    <img
      src={width ? `${src}?width=${width}` : src}
      alt={alt}
      className="max-h-32 w-full object-cover"
    />
  );
};
