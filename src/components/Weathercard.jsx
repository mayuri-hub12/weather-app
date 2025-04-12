import React from 'react'

const Weathercard = ({ data }) => {
  const { location, current } = data;

  return (
    <div className="bg-slate-50 h-[200px] w-[400px] m-auto outline-amber-50 rounded-xl text-xl ">
      <h2 className="py-2">
        {location.name}, {location.country}
      </h2>
      <img
        className="mx-42 py-2 "
        src={current.weather_icons[0]}
        alt={current.weather_descriptions[0]}
      />
      <h3>{current.temperature}°C</h3>
      <p>{current.weather_descriptions[0]}</p>
    </div>
  );
};


export default Weathercard
