// import React from 'react';

// const Login = () => (
//   <div className="p-10 max-w-md mx-auto">
//     <h2 className="text-3xl text-blue-400 mb-4 text-center">Login</h2>
//     <form className="flex flex-col gap-4">
//       <input className="p-2 bg-gray-800 border border-blue-400" type="text" placeholder="Username or Email" />
//       <input className="p-2 bg-gray-800 border border-blue-400" type="password" placeholder="Password" />
//       <select className="p-2 bg-gray-800 border border-blue-400">
//         <option>Candidate</option>
//         <option>Recruiter</option>
//       </select>
//       <button className="p-2 bg-blue-500 text-white hover:bg-blue-600">Login</button>
//     </form>
//   </div>
// );

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ emailid: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Login successful!"); // Log to console
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-3xl text-blue-400 mb-4 text-center">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          name="emailid"
          onChange={handleChange}
          value={formData.emailid}
          className="p-2 bg-gray-800 border border-blue-400"
          type="text"
          placeholder="Email"
        />
        <input
          name="password"
          onChange={handleChange}
          value={formData.password}
          className="p-2 bg-gray-800 border border-blue-400"
          type="password"
          placeholder="Password"
        />
        <button className="p-2 bg-blue-500 text-white hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default Login;
