import { FunctionComponent } from "preact";
import { WfHead } from "wordfresh";
import type { WfHeadProps } from "wordfresh";

export const Wrapper: FunctionComponent<WfHeadProps> = (props) => {
  return (
    <>
      <WfHead {...props} />

      <div className="pb-10">
        {props.children}
      </div>
    </>
  );
};
