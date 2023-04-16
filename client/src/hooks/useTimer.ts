import React, { useState, useEffect, useMemo } from 'react'


function useTimer(initialTimer = { min: 0, sec: 30 }) {
     const [time, setTime] = useState(initialTimer);
     const [isTimeOver, setIsTimeOver] = useState(false)

     function timeOver() {
          setIsTimeOver(true)
          resetTimer();
     }

     function resetTimer() {
          setTime({ ...initialTimer })
          clearInterval(id)
     }

     function startTimer(): number {
          setIsTimeOver(false)
          return setInterval(() => {
               if (time.sec === 0) {
                    if (time.min > 0) {
                         time.min--;
                         time.sec = 60
                    }
               }

               if (time.sec == 0 && time.min == 0) return timeOver();

               time.sec--;
               setTime({ min: time.min, sec: time.sec })

          }, 1000)
     }

     let id: number;

     const timeString = useMemo(() => {
          return `${time.min < 5 ? "0" + time.min : time.min} : ${time.sec < 5 ? "0" + time.sec : time.sec} `
     }, [time])


     return [timeString, startTimer, resetTimer, isTimeOver] as [string, () => number, () => void, boolean]
}

export default useTimer