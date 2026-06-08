import { useEffect, useState } from "react";

const DiscountTimer = () => {
    const targetDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 30 //set 30 days count Down

    const getTimeRemaining = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        return {
            days: Math.floor((diff / (1000 * 60 * 60 * 24))),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining());
        }, 1000);
        return () => clearInterval(timer); // clean up when unmount
    }, []);

    return (
        <div className="flex justify-center md:justify-start space-x-8 text-2xl font-semibold my-6">
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.days}</span>
        <br />
        Days
      </div>
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.hours}</span>
        <br />
        Hrs
      </div>
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.minutes}</span>
        <br />
        Min
      </div>
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.seconds}</span>
        <br />
        Sec
      </div>
    </div>
    );
};

export default DiscountTimer;