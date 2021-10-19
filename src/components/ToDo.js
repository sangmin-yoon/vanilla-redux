import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { remove } from "../store";

const ToDo = ({ text, onBtnClick, id }) => {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>DELETE</button>
    </li>
  );
};

const DispatchToProps = (dispatch, ownProps) => {
  return {
    onBtnClick: () => dispatch(remove(ownProps.id)),
  };
};

export default connect(null, DispatchToProps)(ToDo);
