import { connect } from 'react-redux';
import { Stories } from 'components';
import { fetchTop10Stories } from 'store/stories';

const mapStateToProps = (state) => ({
  stories: state.stories
});

const mapDispatchToProps = {
  fetchTop10Stories
};

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
