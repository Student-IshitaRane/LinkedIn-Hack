import React, { useState, Suspense } from 'react';
import AvatarSelector from './components/SelectAvatar.jsx';
import OfficeScene from './components/OfficeScene.jsx';

export default function App() {
  const [avatarPath, setAvatarPath] = useState(null);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#001f3f] to-[#003366]">
      <Suspense fallback={<div className="text-white text-2xl text-center pt-20">Loading scene...</div>}>
        {!avatarPath ? (
          <AvatarSelector onSelect={(path) => setAvatarPath(path)} />
        ) : (
          <OfficeScene avatarPath={avatarPath} />
        )}
      </Suspense>
    </div>
  );
}
