import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export default function TaskView({ node, updateAttributes }: NodeViewProps) {
  return (
    <NodeViewWrapper className="items-center my-4 relative">
      <div
        contentEditable="false"
        suppressContentEditableWarning
        className="h-6 absolute"
      >
        <input
          type="checkbox"
          onChange={(e) => {
            updateAttributes({ checked: e.target.checked });
          }}
          value={node.attrs.checked}
          className="size-6 border border-black flex justify-center items-center hover:bg-gray-200"
        />
      </div>

      <NodeViewContent
        className={`ml-8 leading-6 ${
          node.attrs.checked ? "text-gray-500 line-through" : ""
        }`}
      />
    </NodeViewWrapper>
  );
}
