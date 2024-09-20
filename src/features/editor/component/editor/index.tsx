import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

import "./index.css";
import Task from "../../extensions/task";
import History from "@tiptap/extension-history";

const extensions = [Document, Paragraph, Text, Task, History];

const content = `
  <react-task>Task1</react-task>
`;

export default function Editor() {
  const editor = useEditor({
    extensions,
    content,
  });

  return (
    <div className="max-w-[720px] mx-auto">
      <EditorContent editor={editor} />
    </div>
  );
}
