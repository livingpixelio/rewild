import { classNames as cn } from "./formatters.ts";
import type { FunctionComponent } from "../../deps.ts";
import type { IconBaseProps } from "jsr:@preact-icons/common@^1.0.12";

export interface IconProps {
  icon: FunctionComponent<IconBaseProps>;
  size?: number;
  className: string;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}

export const Icon: FunctionComponent<IconProps> = (props) => {
  const Icon = props.icon;

  return (
    <div className={cn(props.className, "wf-icon")}>
      <Icon
        width={props.size || "1em"}
        height={props.size || "1em"}
        color={props.color}
        strokeWidth={props.strokeWidth}
      />
    </div>
  );
};

export { LuChevronFirst as ChevronFirst } from "jsr:@preact-icons/lu";
export { LuChevronLast as ChevronLast } from "jsr:@preact-icons/lu";
export { LuChevronLeft as ChevronLeft } from "jsr:@preact-icons/lu";
export { LuChevronRight as ChevronRight } from "jsr:@preact-icons/lu";
