import React, { useState } from "react";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  return (
    <div className="w-full mx-auto  bg-[#000] h-screen fixed">
      <div className="fixed">
        <div className="w-full">
          <input
            type="password"
            className="w-full h-[40px] mb-4 rounded-md pl-2 border-2 border-black"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            className="w-full h-[40px] mb-4 rounded-md pl-2 border-2 border-black"
            placeholder="Confirm New Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
