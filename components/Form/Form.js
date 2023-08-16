import cn from "classnames";
import styles from "./form.module.css";
import { useForm, ValidationError } from "@formspree/react";
import ScrollAnimation from "../ScrollAnimation";

const Form = () => {
  const [state, handleSubmit] = useForm("mzbowgno");

  if (state.succeeded) {
    return (
      <p className={cn("caption", styles.text)}>Thanks for getting in touch!</p>
    );
  }
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <ScrollAnimation>
        <input
          required
          id="name"
          type="name"
          name="name"
          className={cn("caption", styles.input)}
          placeholder="Name"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </ScrollAnimation>
      <ScrollAnimation>
        <input
          id="email"
          type="email"
          name="email"
          className={cn("caption", styles.input)}
          placeholder="Email Address"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </ScrollAnimation>
      <ScrollAnimation>
        <select name="cars" id="cars" className={styles.select}>
          <option value="volvo">$500 - $1000</option>
          <option value="saab">$1000 - $2000</option>
          <option value="mercedes">$3000 - $4000</option>
          <option value="audi">$5000 - $10,000</option>
        </select>
      </ScrollAnimation>
      <ScrollAnimation>
        <textarea
          className={cn("caption", styles.message)}
          id="message"
          name="message"
          placeholder="Comment or Message"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </ScrollAnimation>
      <ScrollAnimation>
        <button
          type="submit"
          disabled={state.submitting}
          className={cn("button", styles.button)}
        >
          Send Message
        </button>
      </ScrollAnimation>
    </form>
  );
};

export default Form;
