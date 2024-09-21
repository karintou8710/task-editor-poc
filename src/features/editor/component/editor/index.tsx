import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

import "./index.css";
import Task from "../../extensions/task";
import History from "@tiptap/extension-history";
import Heading from "@tiptap/extension-heading";
import ResetNode from "../../extensions/reset-node";
import useLocalContent, { setContent } from "../../hooks/useLocalContent";
import Placeholder from "@tiptap/extension-placeholder";

const extensions = [
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
      }

      return "ここにタスクを入力してください";
    },
  }),
];

export default function Editor() {
  const content = useLocalContent();
  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="max-w-[720px] mx-auto">
      <EditorContent editor={editor} />
    </div>
  );
}
