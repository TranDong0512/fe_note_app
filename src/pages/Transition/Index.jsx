import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
function Transition({ children }) {
  return (
    <TransitionGroup>
      <CSSTransition classNames={styles.fade} timeout={300}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
}
Transition.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Transition;
