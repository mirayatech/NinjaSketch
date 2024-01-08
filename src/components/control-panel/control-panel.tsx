import "./control-panel-style.css";
import { PiMinus, PiPlus } from "react-icons/pi";
import { FiGithub } from "react-icons/fi";

import {
  HiOutlineArrowUturnLeft,
  HiOutlineArrowUturnRight,
} from "react-icons/hi2";

type ControlPanelProps = {
  undo: () => void;
  redo: () => void;
  onZoom: (scale: number) => void;
  scale: number;
  setScale: (scale: number) => void;
};

export function ControlPanel({
  undo,
  redo,
  onZoom,
  scale,
  setScale,
}: ControlPanelProps) {
  return (
    <>
      <div className="controlPanel">
        <div className="zoomPanel">
          <button onClick={() => onZoom(-0.1)} aria-label="Zoom Out">
            <PiMinus />
          </button>
          <button onClick={() => setScale(1)} aria-label={`Set scale to 100%`}>
            {new Intl.NumberFormat("en-GB", { style: "percent" }).format(scale)}
          </button>
          <button onClick={() => onZoom(0.1)} aria-label="Zoom In">
            <PiPlus />
          </button>
        </div>

        <div className="editPanel">
          <button onClick={undo} aria-label="Undo last action">
            <HiOutlineArrowUturnLeft />
          </button>
          <button onClick={redo} aria-label="Redo last action">
            <HiOutlineArrowUturnRight />
          </button>
        </div>
      </div>{" "}
      <a className="link" href="https://github.com/mirayatech" target="_blank">
        <FiGithub />
        Created by Miraya
      </a>
    </>
  );
}
