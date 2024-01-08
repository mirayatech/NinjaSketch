import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
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
          <Tippy content="Zoom Out">
            <button onClick={() => onZoom(-0.1)} aria-label="Zoom Out">
              <PiMinus />
            </button>
          </Tippy>
          <Tippy content={`Set scale to 100%`}>
            <button
              onClick={() => setScale(1)}
              aria-label={`Set scale to 100%`}
            >
              {new Intl.NumberFormat("en-GB", { style: "percent" }).format(
                scale
              )}
            </button>
          </Tippy>
          <Tippy content="Zoom In">
            <button onClick={() => onZoom(0.1)} aria-label="Zoom In">
              <PiPlus />
            </button>
          </Tippy>
        </div>

        <div className="editPanel">
          <Tippy content="Undo last action">
            <button onClick={undo} aria-label="Undo last action">
              <HiOutlineArrowUturnLeft />
            </button>
          </Tippy>
          <Tippy content="Redo last action">
            <button onClick={redo} aria-label="Redo last action">
              <HiOutlineArrowUturnRight />
            </button>
          </Tippy>
        </div>
      </div>{" "}
      <a className="link" href="https://github.com/mirayatech" target="_blank">
        <FiGithub />
        Created by Miraya
      </a>
    </>
  );
}
