'use client'
import MeetingTypeList from '@/components/MeetingTypeList';
import { useEffect, useState } from 'react';

const Home = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateDateAndTime = () => {
      const date = new Date();
      setCurrentDate(date.toLocaleDateString());
      setCurrentTime(`${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`);
    };

    updateDateAndTime();

    const timeUntilNextMinute = 60 - new Date().getSeconds();
    const intervalId = setTimeout(() => {
      updateDateAndTime();
      setInterval(updateDateAndTime, 60000); // Update every minute
    }, timeUntilNextMinute * 1000); // Wait until the next minute

    // Clear interval on component unmount
    return () => {
      clearTimeout(intervalId);
    };
  }, []);

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
            Upcoming meeting at: 12:00 PM
          </h2>

          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {currentTime}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {currentDate}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default Home