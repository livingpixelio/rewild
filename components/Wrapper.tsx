import { FunctionComponent } from "preact";
import { WfHead } from "wordfresh";
import type { WfHeadProps } from "wordfresh";

interface Props extends WfHeadProps {
  headerImageSlug: string;
  headerImageAlt: string;
}

export const Wrapper: FunctionComponent<Props> = (props) => {
  return (
    <>
      <WfHead {...props} />

      <div>
        {props.children}
      </div>
    </>
  );
};
