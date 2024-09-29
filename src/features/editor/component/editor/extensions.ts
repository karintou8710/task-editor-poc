import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Task from "../../extensions/task";
import History from "@tiptap/extension-history";
import Heading from "@tiptap/extension-heading";
import ResetNode from "../../extensions/reset-node";
import Placeholder from "@tiptap/extension-placeholder";
import UniqueId from "../../extensions/unique-id";
import Dropcursor from "@tiptap/extension-dropcursor";

export const extensions = [
  Document,
  Paragraph,
  Text,
  Task,
  History,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  ResetNode,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "タスクカテゴリを入力してください";
      } else if (node.type.name === "paragraph") {
        return "文字を入力するか、「[」(角括弧)でタスクを作成します";
      } else if (node.type.name === "task") {
        return "タスクを入力してください";
      }

      console.log(node.type.name);

      return "";
    },
  }),
  UniqueId,
  Dropcursor,
];
