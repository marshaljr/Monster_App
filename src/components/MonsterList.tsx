import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteList from "./FavoriteList";

interface Monster {
  index: string;
  name: string;
}
const MonsterList = () => {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.dnd5eapi.co/api/monsters/"
        );
        const data = response.data.results;
        setMonsters(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex w-full bg-gray-400 py-10 gap-8 ">
      <div className="flex flex-col items-center w-[900px]">
        <h2 className="text-xl font-bold mb-5">Monsters List</h2>
        <ul className="flex flex-wrap justify-center gap-4 w-full max-w-4xl mx-auto">
          {monsters.map((monster) => (
            <li
              className="border p-2 rounded shadow text-center bg-gray-300 text-black w-1/5 flex justify-center items-center cursor-pointer"
              key={monster.index}>
              <Link to={`/monster/${monster.index}`}>
                <span className="block">{monster.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[300px] flex flex-col items-center bg-gray-400 p-4 rounded-md shadow-lg">
        <FavoriteList />
      </div>
    </div>
  );
};

export default MonsterList;
