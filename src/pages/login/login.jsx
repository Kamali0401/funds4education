import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import login from "../../app/assests/login.jpg";
import "./login.css";
import { FaLinkedin, FaInstagram, FaTwitter, FaPinterest, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { routePath as RP } from "../../app/components/router/routepath";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-form">
                    <h2>Login</h2>
                    <p>
                        Doesn’t have an account yet? <Link to={RP.signup}>Sign Up</Link>
                    </p>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="you@example.com" />
                    </div>

                    <div className="input-group password-group">
                        <label>Password</label>
                        <input type={showPassword ? "text" : "password"} placeholder="Enter password" />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>

                    <button className="login-btn">LOGIN</button>

                    <div className="divider">
                        <div></div>
                        <span>or login with</span>
                        <div></div>
                    </div>

                    <div className="social-buttons">
                        <button className="social-btn"><FcGoogle /> Google</button>
                        <button className="social-btn"><FaFacebook /> Facebook</button>
                        <button className="social-btn"><FaLinkedin /> LinkedIn</button>
                        <button className="social-btn"><FaInstagram /> Instagram</button>
                        <button className="social-btn"><FaTwitter /> X</button>
                        <button className="social-btn"><FaPinterest /> Pinterest</button>
                    </div>
                </div>

                <div className="login-illustration">
                    <img src={login} alt="Login Illustration" />
                </div>
            </div>
        </div>

    );
}
