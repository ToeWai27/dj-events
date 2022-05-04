import { FaUser } from "react-icons/fa";
import styles from "@/styles/AuthForm.module.css";
import { useEffect, useState, useContext } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import AuthContext from "context/AuthContext";
export default function RegisterPage() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const { register, error } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    register({ username, email, password });
  };
  return (
    <Layout title="User Registeration">
      <div className={styles.auth}>
        <h1>
          <FaUser />
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username"> Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={() => setusername(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email"> Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={() => setemail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={() => setpassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={() => setpasswordConfirm(e.target.value)}
            ></input>
          </div>
          <input type="submit" value="login" className="btn" />
        </form>
        <p>
          Already have an account?<Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
}
