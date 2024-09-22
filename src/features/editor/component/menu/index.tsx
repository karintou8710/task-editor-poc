import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor;
};

export default function Menu({ editor }: Props) {
  return (
    <div className="px-8">
      <button
        className="bg-blue-400 px-4 py-2 rounded font-bold text-white hover:opacity-80 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:opacity-100"
        onClick={() => editor.chain().focus().deleteCheckedTask().run()}
        disabled={!editor.can().deleteCheckedTask()}
      >
        タスク完了
      </button>
    </div>
  );
}
