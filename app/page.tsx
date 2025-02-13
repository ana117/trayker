"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const toggleTimer = () => {
    setIsOn(!isOn);
  };
  
  useEffect(() => {
    if (isOn) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current as NodeJS.Timeout);
    }
    return () => {
      clearInterval(timerRef.current as NodeJS.Timeout);
    };
  }, [isOn]);

  const parseTime = (time: number) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <main className="flex flex-col items-center justify-center gap-8 w-screen h-screen">
      <button className="size-56 md:size-64 bg-gray-200 rounded-full flex items-center justify-center" onClick={toggleTimer}>
        <p className="text-4xl font-bold text-center text-background">
          {parseTime(time)}
        </p>
      </button>
      
      {isOn ? (
        <p className="text-xl md:text-2xl font-bold text-center text-red-500">
          You are not wearing your aligner!
        </p>
      ) : (
        <p className="text-2xl text-background">
          -
        </p>
      )}
    </main>
  );
}
