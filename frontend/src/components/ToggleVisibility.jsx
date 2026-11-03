import { useState, forwardRef, useImperativeHandle } from "react";
import { shadow, styleInitial } from "../styles";

const ToggleVisibility = forwardRef(
  ({ children }, refs) => {
    const [visibility, setVisibility] = useState(false);

    const toggleVisibility = () => {
      setVisibility(!visibility);
    };

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      };
    });

    const style = {
      ...styleInitial,
      ...shadow,
    }

    return (
      <div>
        <div style={{ display: visibility ? "none" : "" }}>
          <h2>
            <input
              style={style}
              type="button"
              value="C"
              className="btnInvert createBtn"
               onClick={toggleVisibility}
            />
            <span>reate New Blog</span>
          </h2>
        </div>
        <div style={{ display: visibility ? "" : "none" }}>
          {children}
          <div className="form-width">
            <button className="btnInvert" onClick={toggleVisibility}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ToggleVisibility.displayName = "ToggleVisibility";

export default ToggleVisibility;
