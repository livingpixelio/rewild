/**
 * Root
 */
export interface Root {
  type: "root";
  children: Block[];
}

/**
 * BLOCKS
 */
export interface Yaml {
  type: "yaml";
  value: string;
}

export interface Heading {
  type: "heading";
  depth: number;
  children: Inline[];
}

interface Paragraph {
  type: "paragraph";
  children: Inline[];
}

export interface List {
  type: "list";
  ordered: boolean;
  children: Array<ListItem>;
}

interface ListItem {
  type: "listItem";
  children: [Paragraph | List];
}

interface Blockquote {
  type: "blockquote";
  children: Paragraph[];
}

export type Lang =
  | "typescript"
  | "javascript"
  | "jsx"
  | "tsx"
  | "css"
  | "html"
  | "python"
  | "php";

interface Code {
  type: "code";
  value: string;
  lang: Lang;
}

interface ThematicBreak {
  type: "thematicBreak";
}

type Block =
  | Yaml
  | Heading
  | Paragraph
  | Blockquote
  | List
  | ListItem
  | Code
  | ThematicBreak
  | Attachment;

/**
 * Inline and text
 */

interface Link {
  type: "link";
  url: string;
  children: Inline[];
}

interface XLink {
  type: "xlink";
  filename: string;
  url?: string;
  children: Inline[];
}

interface Emphasis {
  type: "emphasis";
  children: Inline[];
}

interface Strong {
  type: "strong";
  children: Inline[];
}

export interface Text {
  type: "text";
  value: string;
}

export interface InlineCode {
  type: "inlineCode";
  value: string;
}

export interface Image {
  type: "image";
  url: string;
  alt: string;
}

type Inline =
  | Link
  | XLink
  | Image
  | Emphasis
  | Strong
  | Text
  | InlineCode;

export type Branch = Paragraph;

interface Attachment {
  type: "attachment";
  filename: string;
  extension: string;
  alt?: string;
  src?: string;
}

export interface Shortcode {
  type: "shortcode";
  name: string;
  [key: string]: string | undefined;
}

export type Leaf =
  | Yaml
  | ThematicBreak
  | Text
  | Code
  | InlineCode
  | Image
  | Attachment
  | Shortcode;

export type MdastNode = Root | Block | Inline | Attachment | Shortcode;

export type ParentOfText =
  | Heading
  | Paragraph
  | Link
  | XLink
  | Emphasis
  | Strong;

export const isLeaf = (node: MdastNode): node is Leaf => {
  return !(node as Root).children;
};
