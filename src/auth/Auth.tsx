import { FormEvent, useContext, useState } from "react";
import { AuthSessionContext } from "./AuthSessionContext";
import { Navigate } from "react-router-dom";
import styles from "../utils/utils.module.css";
import { supabase } from "../supabaseClient";

const Auth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const { session } = useContext(AuthSessionContext);

  const HandleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        throw error;
      }
      alert("Check your email for login link!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.centeredFlex}>
      <div>
        <h1>Web Book App</h1>
        <p>Sign in via magic link with your email below</p>
        {loading ? (
          "sending magic link ..."
        ) : (
          <form onSubmit={HandleLogin}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Your email"
            />
            <button>Send magic link</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
