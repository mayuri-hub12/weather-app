import { useState, useEffect } from "react";
import "./App.css";
import Weathercard from "./components/Weathercard";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (city) => {
    console.log("Fetching weather for:", city); 
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      );

      console.log("Fetch completed, raw response:", response);

      const data = await response.json();
      console.log("Parsed data:", data);

      if (data.error) {
        setError("City not found!");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      console.log("Caught error:", err); 
      setError("Failed to fetch data.");
    }

    setLoading(false);
  };

 const handleSubmit = (e) => {
   e.preventDefault();
   console.log("Search submitted with query:", query); 

   if (query.trim()) {
     fetchWeather(query);
   }
 };

 console.log("API Key:", API_KEY);
  return (
    <div className="h-screen w-full bg-blue-950 text-white text-5xl font-bold text-center ">
      <h1 className="py-16 animate-bounce ">🌤 Weather App</h1>
      <div
        className="h-[300px] w-[700px] bg-slate-300 outline-hidden rounded-xl text-3xl m-auto text-slate-800
 "
      >
        <form onSubmit={handleSubmit} className="py-12 outline-zinc-600 ">
          <input
            type="text"
            placeholder="Enter city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-amber-50 outline-white rounded-2xl hover:bg-slate-400 h-12 w-40 mx-2"
          >
            Search
          </button>
        </form>

        <div className="h-[300px] w-[700px] bg-slate-300 outline-hidden rounded-xl text-3xl m-auto text-slate-800">
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}

          {weather && <Weathercard data={weather} />}
        </div>
      </div>
    </div>
  );
}


export default App;
