import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import clsx from "clsx";
import { useRef } from "react";
import { BsCalendarDate } from "react-icons/bs";
import {
  getDiffDays,
  isBeforeDay,
  isInOneWeek,
  isToday,
  isTomorrow,
  isTowDaysAgo,
} from "../../libs/date";

export default function TaskView({ node, updateAttributes }: NodeViewProps) {
  const ref = useRef<HTMLInputElement>(null);

  const getDeadlineText = (deadline: string | null) => {
    if (deadline == null) return "未定";

    if (isToday(deadline)) {
      return "今日";
    } else if (isTomorrow(deadline)) {
      return "明日";
    } else if (isTowDaysAgo(deadline)) {
      return "明後日";
    } else if (isInOneWeek(deadline)) {
      return `${getDiffDays(deadline)}日後`;
    }

    return deadline;
  };

  return (
    <NodeViewWrapper className="items-center my-5 flex">
      <label
        contentEditable="false"
        suppressContentEditableWarning
        className="h-6 mr-2"
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

      <div
        contentEditable="false"
        suppressContentEditableWarning
        className="mr-3 flex items-center gap-2"
      >
        <span className="w-[110px] text-center">
          <span
            className={clsx(
              "py-1 px-3 bg-blue-400 text-white text-xs font-bold rounded-full",
              node.attrs.deadline == null && "bg-gray-200 text-black",
              node.attrs.deadline &&
                isToday(node.attrs.deadline) &&
                "bg-orange-400 text-white text-base",
              node.attrs.deadline &&
                isTomorrow(node.attrs.deadline) &&
                "bg-orange-400 text-white text-base",
              node.attrs.deadline &&
                isTowDaysAgo(node.attrs.deadline) &&
                "text-base",
              node.attrs.deadline &&
                isBeforeDay(node.attrs.deadline) &&
                "bg-red-400 text-white"
            )}
          >
            {getDeadlineText(node.attrs.deadline)}
          </span>
        </span>

        <button onClick={() => ref.current?.showPicker()}>
          <BsCalendarDate size={16} />
        </button>
        <input
          type="date"
          value={node.attrs.deadline ?? ""}
          className="invisible w-0.5"
          onChange={(e) => {
            updateAttributes({ deadline: e.target.value });
          }}
          ref={ref}
        />
      </div>

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
