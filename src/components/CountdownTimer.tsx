import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function CountdownTimer() {
  const { state } = useApp();
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 30,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const text = {
    en: {
      hotDeal: "Today's Hot Deal",
      endsIn: 'Ends in',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    },
    hi: {
      hotDeal: 'आज का हॉट डील',
      endsIn: 'समाप्त होगा',
      hours: 'घंटे',
      minutes: 'मिनट',
      seconds: 'सेकंड'
    }
  };

  return (
    <div className={`p-4 rounded-xl shadow-lg bg-gradient-to-r from-orange-500 to-red-500 text-white mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span className="font-semibold">{text[state.language].hotDeal}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm">{text[state.language].endsIn}:</span>
          
          <div className="flex space-x-2">
            <div className="text-center">
              <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[2.5rem]">
                <span className="font-bold text-lg">{timeLeft.hours.toString().padStart(2, '0')}</span>
              </div>
              <span className="text-xs">{text[state.language].hours}</span>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[2.5rem]">
                <span className="font-bold text-lg">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              </div>
              <span className="text-xs">{text[state.language].minutes}</span>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-lg px-2 py-1 min-w-[2.5rem]">
                <span className="font-bold text-lg">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              </div>
              <span className="text-xs">{text[state.language].seconds}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}