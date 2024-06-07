import JoinModal from '@/components/Modal/JoinModal';
import useAuth from '@/Hooks/useAuth';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';

const CampReservation = ({ camp }) => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState([
    {
      startDate: new Date(camp?.dateTime),
      endDate: new Date(camp?.dateTime),
      key: "selection",
    },
  ]);

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <hr />
      <div className="flex justify-center">
        <DateRange
          rangeColors={["#4CBDF8"]}
          onChange={(item) => {
            setState([
              {
                startDate: new Date(camp?.dateTime),
                endDate: new Date(camp?.dateTime),
                key: "selection",
              },
            ]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
      <hr />
      <div className="p-3">
        <button
          onClick={() => setIsOpen(true)}
          className='w-full p-3  text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#0EA5E9]'
        >Join Camp</button>
      </div>
      {/* modal */}
      <JoinModal
        isOpen={isOpen}
        closeModal={closeModal}
        campInfo={{
          ...camp,
          price: camp?.fees,
          organizer: { name: user?.displayName },
        }}
      />
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${camp?.fees}</div>
      </div>
    </div>
  );
};

export default CampReservation;