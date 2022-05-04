import { FaUser } from "react-icons/fa";
import styles from "@/styles/AuthForm.module.css";
import { useEffect, useState, useContext } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import AuthContext from "context/AuthContext";
export default function LoginPage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { login, error } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser />
          Log In
        </h1>
        <form onSubmit={handleSubmit}>
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
          <input type="submit" value="login" className="btn" />
        </form>
        <p>
          Don't have an account?<Link href="/account/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
}
