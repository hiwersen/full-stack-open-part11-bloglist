import { useNotificationValue } from "../hooks";
import { dynamicWidth, size } from "../styles";

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) return null;

  const color = notification.error ? "red" : "green";
  const shadow = notification.error ? "#e1afab" : "#abc4a2";

  const style = {
    ...dynamicWidth,
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translate(-50%, -0%)",
    backgroundColor: "lightGray",
    opacity: 0.9,
    borderRadius: size.sz1,
    border: `solid ${size.sz1} ${color}`,
    padding: `${size.sz6} ${size.sz5}`,
    color,
    fontSize: "1.5em",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    boxShadow: `0 ${size.sz4} ${size.sz5} ${shadow}`,
    zIndex: 99,
  };

  return (
    <div style={style}>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
