// Form.js
import styles from "../FromCustom/StyleForm.module.css";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
const Form = ({ fields, onSubmit, buttonText }) => {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ name, placeholder, type, rules, onChange }) => (
        <div key={name} className={styles.input_box}>
          <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <>
                <div className={styles.inputWrapper}>
                  <input
                    type={type}
                    placeholder={placeholder}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      onChange && onChange(e); // Call the passed onChange if it exists
                    }}
                    className={styles.input}
                  />
                  {name === "userName" && (
                    <AccountCircleIcon className={styles.icon} />
                  )}

                  {name === "email" && <EmailIcon className={styles.icon} />}
                  {name === "password" && <LockIcon className={styles.icon} />}
                </div>
                {error && <p className={styles.error}>{error.message}</p>}
              </>
            )}
          />
        </div>
      ))}
      <button type="submit" className={styles.btn}>
        {buttonText}
      </button>
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      rules: PropTypes.object,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Form;
