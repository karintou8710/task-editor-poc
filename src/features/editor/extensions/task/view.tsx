import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export default function TaskView({ node, updateAttributes }: NodeViewProps) {
  return (
    <NodeViewWrapper className="items-center my-4 flex">
      <label
        contentEditable="false"
        suppressContentEditableWarning
        className="h-6 mr-6"
      >
        <input
          type="checkbox"
          onChange={(e) => {
            updateAttributes({ checked: e.target.checked });
          }}
          checked={node.attrs.checked}
          className="size-6 border border-black flex-[0_0_auto]"
        />
      </label>

      <div className="flex-auto">
        <NodeViewContent
          className={`${
            node.attrs.checked ? "text-gray-500 line-through" : ""
          }`}
        />
      </div>
    </NodeViewWrapper>
  );
}
