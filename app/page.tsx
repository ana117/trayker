"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const toggleTimer = () => {
    setIsOn(!isOn);
    localStorage.setItem('trayker-date', new Date().toString());
  };

  useEffect(() => {
    const today = new Date();
    const storedDate = localStorage.getItem('trayker-date');
    const lastDate = storedDate ? new Date(storedDate) : today;

    const storedTime = localStorage.getItem('trayker-time');
    if (storedTime && lastDate.getDate() === today.getDate()) {
      setTime(Number(storedTime));
    } else {
      localStorage.removeItem('trayker-date');
      localStorage.removeItem('trayker-time');
    }
  }, []);
  
  useEffect(() => {
    if (isOn) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          localStorage.setItem('trayker-time', String(prev + 1));
          return prev + 1;
        });
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
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-primary">
      <main className="flex flex-col items-center justify-center gap-8 grow">
        <button className="size-56 md:size-64 bg-gray-200 hover:bg-gray-400 rounded-full flex items-center justify-center duration-500" onClick={toggleTimer}>
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
      <footer className="flex items-center justify-center gap-4 p-8 w-full">
        <a href="https://github.com/ana117/trayker" target="_blank" rel="noopener noreferrer" className="text-background hover:scale-110 duration-500">
          <img src="/trayker.svg" alt="Trayker" className="size-8" />
        </a>
      </footer>
    </div>
  );
}
