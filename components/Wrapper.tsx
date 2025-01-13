import { FunctionComponent } from "preact";
import { WfHead } from "wordfresh";
import type { WfHeadProps } from "wordfresh";
import Navbar from "./Navbar.tsx";

export const Wrapper: FunctionComponent<WfHeadProps> = (props) => {
  return (
    <>
      <WfHead {...props} />

      <Navbar />

      <div className="pb-10">
        {props.children}
      </div>
    </>
  );
};
