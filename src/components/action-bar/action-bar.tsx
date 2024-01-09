import { Tools, ToolsType } from "../../types";

import { LuMousePointer, LuPencil } from "react-icons/lu";
import { FiSquare } from "react-icons/fi";
import { IoText } from "react-icons/io5";
import { PiMinusBold } from "react-icons/pi";
import "./action-bar-style.css";

type ActionBarProps = {
  tool: ToolsType;
  setTool: (tool: ToolsType) => void;
};

export function ActionBar({ tool, setTool }: ActionBarProps) {
  return (
    <div className="actionBar">
      {Object.values(Tools).map((t, index) => (
        <div
          className={`inputWrapper ${tool === t ? "selected" : ""}`}
          key={t}
          onClick={() => setTool(t)}
        >
          <input
            type="radio"
            id={t}
            checked={tool === t}
            onChange={() => setTool(t)}
            readOnly
          />
          <label htmlFor={t}>{t}</label>
          {t === "selection" && <LuMousePointer />}
          {t === "rectangle" && <FiSquare />}
          {t === "line" && <PiMinusBold />}
          {t === "pencil" && <LuPencil />}
          {t === "text" && <IoText />}

          <span>{index + 1}</span>
        </div>
      ))}
    </div>
  );
}
