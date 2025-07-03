import { Text } from "./MdastNode.ts";

export const parseCaption = (input: string): Text[] | null => {
  if (!input) {
    return null;
  }

  return [{ type: "text", value: input }];
};
