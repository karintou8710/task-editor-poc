import { Node } from "@tiptap/react";

const Document = Node.create({
  name: "doc",
  topNode: true,
  content: "task+",
});

export default Document;
