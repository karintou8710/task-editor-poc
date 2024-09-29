import { EditorContent, useEditor } from "@tiptap/react";

import useLocalContent, { setContent } from "../../hooks/useLocalContent";
import Menu from "../menu";
import DragHandle from "../../extensions/drag-handle";
import { extensions } from "./extensions";

import "./index.css";

export default function Editor() {
  const content = useLocalContent();
  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="max-w-[720px] mx-auto">
      <Menu editor={editor} />
      <EditorContent editor={editor} className="px-4 my-6" />
      <DragHandle editor={editor} />
    </div>
  );
}
