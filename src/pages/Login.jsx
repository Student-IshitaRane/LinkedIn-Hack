import React from 'react';

const Login = () => (
  <div className="p-10 max-w-md mx-auto">
    <h2 className="text-3xl text-blue-400 mb-4 text-center">Login</h2>
    <form className="flex flex-col gap-4">
      <input className="p-2 bg-gray-800 border border-blue-400" type="text" placeholder="Username or Email" />
      <input className="p-2 bg-gray-800 border border-blue-400" type="password" placeholder="Password" />
      <select className="p-2 bg-gray-800 border border-blue-400">
        <option>Candidate</option>
        <option>Recruiter</option>
      </select>
      <button className="p-2 bg-blue-500 text-white hover:bg-blue-600">Login</button>
    </form>
  </div>
);

export default Login;