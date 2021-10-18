import { connect } from "react-redux";
import { useHistory } from "react-router";
import { actionCreators } from "../store";

const Detail = ({ toDo, onBtnClick }) => {
  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Created at: {toDo?.id}</h5>
      <button onClick={onBtnClick}>삭제!!</button>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return { toDo: state.toDos?.find((toDo) => toDo.id === parseInt(id)) };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;

  const back = ownProps.history.replace;
  return {
    onBtnClick: () => {
      dispatch(actionCreators.deleteToDo(parseInt(id)));
      back("/");
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
