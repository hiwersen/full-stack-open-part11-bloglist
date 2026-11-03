import Field from "./Field"
import { useField } from "../hooks/index";
import PropTypes from "prop-types";
import Subheading from "./Subheading";
import { color, size } from "../styles";

const AuthForm = ({ type, auth }) => {
  const name = useField('name');
  const username = useField('username');
  const password = useField('password', 'password');

  const handleAuth = () => {
    auth({
      username : username.value,
      password : password.value,
      name : name.value
    });
  };

  const style = {
    fontSize: '0.625em',
    color: color.c2,
    marginTop: size.sz8,
    marginBottom: size.sz8,
    textAlign: 'center',
  }

  return (
    <>
      <div style={style}>
        <Subheading text="Blog your blogs" />
      </div>
      <form>
        {type === "Sign Up" && <Field attributes={ name } />}
        <Field attributes={ username } />
        <Field attributes={ password } />
        <button type="button" onClick={handleAuth}>{type}</button>
      </form>
    </>
  );
};

AuthForm.propTypes = {
  type: PropTypes.string.isRequired,
  auth: PropTypes.func.isRequired,
};

export default AuthForm;
