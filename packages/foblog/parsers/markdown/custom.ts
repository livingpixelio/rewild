import { Text } from "./MdastNode.ts";

export const parseCaption = (input: string): Text[] => {
  if (!input) {
    return [];
  }

  return [{ type: "text", value: input }];
};
