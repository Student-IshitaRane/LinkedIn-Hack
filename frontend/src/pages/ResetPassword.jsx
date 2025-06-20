import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-hot-toast";
import axios from "axios";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { emailid } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const resetPassword = async () => {
    if (!newPassword) {
      toast.error("Please enter a new password.");
      return;
    }

    try {
      const response = await axios.post(`https:localhost:4000/auth/reset-password/${emailid}`, { newPassword });

      if (response.status === 200) {
        setMessage(response.data.msg || 'Password reset successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-indigo-400">
            Reset Password
          </h2>
          <p className="text-gray-400 mt-2">
            Enter your new password for <span className="font-semibold">{emailid}</span>
          </p>
        </div>

        {message && (
          <div className="bg-green-500 text-white p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={resetPassword}>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="reset-password-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button type="button" className="show-password-btn" onClick={toggleShowPassword}>
            {showPassword ? "Hide Password" : "Show Password"}
          </button>

          <button className="reset-password-btn" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;