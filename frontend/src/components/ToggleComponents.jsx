import { useState } from "react";
import PropTypes from "prop-types";
import { borderB, flex, size, color } from "../styles";

const ToggleComponents = ({ showByDefault, hideByDefault, children }) => {
  const [toggle, setToggle] = useState(false);

  const divider = {
    ...flex,
    alignItems: 'center',
    minHeight: size.sz8,
    marginBottom: size.sz2,
    fontWeight: 'bold',
  };

  const line = {
    ...borderB,
    display: 'inline-block',
    flex: 1,
  };

  const link = {
    textAlign: 'center',
    color: color.c2,
    fontWeight: 'bold',
  }

  return (
    <div>
      <div>
        {children[toggle & 1]}
      </div>
      <div className="form-width">
        <div style={divider} >
          <span style={line} /><span>or</span><span style={line} />
        </div>
        <div style={link}>
          <a style={{ color: 'inherit' }} onClick={() => { setToggle(!toggle); }} >
            {toggle ? hideByDefault : showByDefault}
          </a>
        </div>
      </div>
    </div>
  );
};

ToggleComponents.propTypes = {
  showByDefault: PropTypes.string.isRequired,
  hideByDefault: PropTypes.string.isRequired,
};

export default ToggleComponents;
