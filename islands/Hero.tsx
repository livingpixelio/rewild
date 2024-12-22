import { IS_BROWSER } from "$fresh/runtime.ts";
import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

const Hero: FunctionComponent = ({ children }) => {
  const [width, setWidth] = useState<number | "smallest">("smallest");
  useEffect(() => {
    if (!IS_BROWSER) return;

    const width = globalThis.innerWidth;
    setWidth(width);
  }, []);

  return (
    <div
      className="bg-dark bg-cover bg-fixed pb-20 mb-20"
      style={{ backgroundImage: `url(/image/forest1?width=${width})` }}
    >
      <div
        class="px-4 py-20 mx-auto text-white"
        style={{
          backgroundColor: "hsla(273.33, 9.89%, 17.84%, 0.6)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Hero;
