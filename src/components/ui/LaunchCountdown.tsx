"use client";

import { useEffect, useState } from "react";

type LaunchCountdownProps = {
  date: string;
};

function getTimeLeft(targetDate: string) {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return null;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  return { days, hours, minutes };
}

export default function LaunchCountdown({ date }: LaunchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(date));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  if (!timeLeft) {
    return <p className="text-sm text-slate-600">Rejse tilgængelig nu</p>;
  }

  return (
    <p className="text-sm text-slate-600">
      {timeLeft.days} dage, {timeLeft.hours} timer, {timeLeft.minutes} minutter
    </p>
  );
}
