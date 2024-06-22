import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const Input = ({ name, control, rules, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div>
      <input {...field} {...props} />
      {error && <p>{error.message}</p>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
};

export default Input;
