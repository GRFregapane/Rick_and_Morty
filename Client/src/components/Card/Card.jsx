

function mapState(state) {
  return {
    myFavorites: state.myFavorites,
  };
}
function mapDispatch(dispatch) {
  return {
    addFav: function (char) {
      dispatch(addFav(char));
    },
    removeFav: function (id) {
      dispatch(removeFav(id));
    },
  };
}

export default connect(mapState, mapDispatch)(Card);

