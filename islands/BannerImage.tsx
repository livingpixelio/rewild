import { useWindowWidth } from "../hooks/useWindowWidth.ts";
import type { FunctionComponent } from "preact";

interface Props {
  src?: string;
  alt?: string;
}

export const BannerImage: FunctionComponent<Props> = ({ src, alt }) => {
  const width = useWindowWidth();

  if (!src) return null;

  return (
    <img
      src={`${src}?width=${width}`}
      alt={alt}
      className="max-h-32 w-full object-cover"
    />
  );
};
