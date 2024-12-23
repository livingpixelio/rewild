import { FunctionComponent } from "preact";
import { useWindowWidth } from "../hooks/useWindowWidth.ts";

interface Props {
  imgSlug: string;
  imgAlt: string;
  reverse?: boolean;
}

export const HalfCut: FunctionComponent<Props> = (
  { imgSlug, imgAlt, reverse, children },
) => {
  const width = useWindowWidth();

  return (
    <div
      class={`sm:flex flex-row items-stretch ${reverse && "flex-row-reverse"}`}
    >
      <div class="sm:w-[50%] bg-dark flex-shrink-0 flex-grow-1">
        <img
          src={`/image/${imgSlug}?width=${
            typeof width === "number" ? "largest" : "smallest"
          }`}
          alt={imgAlt}
          className="object-cover w-full h-[150px] sm:h-full"
        />
      </div>
      <div class="p-8 flex-grow-0">
        {children}
      </div>
    </div>
  );
};
