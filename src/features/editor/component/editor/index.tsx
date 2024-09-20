import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

import "./index.css";

const extensions = [Document, Paragraph, Text];

const content = `
  <p>Text</p>
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
