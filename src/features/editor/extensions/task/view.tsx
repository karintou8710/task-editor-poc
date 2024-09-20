import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export default function TaskView({
  editor,
  getPos,
  deleteNode,
}: NodeViewProps) {
  const onDone = () => {
    const pos = getPos();
    deleteNode();
    editor.chain().focus().setTextSelection(pos).run();
  };

  return (
    <NodeViewWrapper className="items-center my-4 relative">
      <div
        contentEditable="false"
        suppressContentEditableWarning
        className="h-6 absolute"
      >
        <button
          onClick={onDone}
          className="size-6 border border-black flex justify-center items-center hover:bg-gray-200"
        >
          d
        </button>
      </div>

      <NodeViewContent className="ml-8 leading-6" />
    </NodeViewWrapper>
  );
}
