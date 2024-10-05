import Text from "@tiptap/extension-text";
import Task from "../../extensions/task";
import History from "@tiptap/extension-history";
import Placeholder from "@tiptap/extension-placeholder";
import UniqueId from "../../extensions/unique-id";
import Dropcursor from "@tiptap/extension-dropcursor";
import Link from "@tiptap/extension-link";
import LinkAtEnd from "../../extensions/link-at-end";
import Document from "../../extensions/document";

export const extensions = [
  Document,
  Text,
  Task,
  History,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "task") {
        return "タスクを入力してください";
      }

      return "";
    },
  }),
  UniqueId,
  Dropcursor,
  LinkAtEnd,
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: "https",
  }),
];
