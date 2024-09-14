import React, { useEffect, useState } from 'react';

const NotFound = () => {
  const [position, setPosition] = useState({ top: 50, left: 50 }); // Boshlang'ich pozitsiya
  const [velocity, setVelocity] = useState({ x: 2, y: 2 }); // Harakat tezligi (x va y yo'nalishlaridagi tezlik)

  useEffect(() => {
    const moveElement = () => {
      setPosition((prevPosition) => {
        let newTop = prevPosition.top + velocity.y;
        let newLeft = prevPosition.left + velocity.x;

        // Devorga urilganda yo'nalishni o'zgartirish
        if (newTop <= 0 || newTop >= window.innerHeight - 50) {
          setVelocity((prevVelocity) => ({ ...prevVelocity, y: -prevVelocity.y }));
        }
        if (newLeft <= 0 || newLeft >= window.innerWidth - 50) {
          setVelocity((prevVelocity) => ({ ...prevVelocity, x: -prevVelocity.x }));
        }

        return { top: newTop, left: newLeft };
      });
    };

    // Element harakatini boshqarish uchun interval
    const intervalId = setInterval(moveElement, 10); // 10ms tezlikda

    // Intervalni tozalash
    return () => clearInterval(intervalId);
  }, [velocity]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4 overflow-hidden">
      <h1 className="text-9xl font-bold text-blue-800 animate-pulse mb-8">404</h1>
      
      <h2 className="text-4xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      
      <p className="text-lg text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
      
      <a href="/">
        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-blue-500 active:bg-blue-700 transition duration-300">
          Go Back Home
        </button>
      </a>

      {/* Harakatlanuvchi element */}
      <div
        className="absolute w-12 h-12 bg-blue-600 rounded-full opacity-75"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      ></div>
    </div>
  );
}

export default NotFound;