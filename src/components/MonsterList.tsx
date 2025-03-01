import { Link } from "react-router-dom";
import FavoriteList from "./FavoriteList";
import { useQuery } from "@tanstack/react-query";

interface Monster {
  index: string;
  name: string;
}
const MonsterList = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["monsters"],
    queryFn: async () => {
      const response = await fetch("https://www.dnd5eapi.co/api/monsters/");
      return response.json();
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex w-full bg-gray-400 py-10 gap-8 ">
      <div className="flex flex-col items-center w-[900px]">
        <h2 className="text-xl font-bold mb-5">Monsters List</h2>
        <ul className="flex flex-wrap justify-center gap-4 w-full max-w-4xl mx-auto">
          {data?.results.map((monster: Monster) => (
            <li
              className="border p-2 rounded shadow text-center bg-gray-300 text-black w-1/5 flex justify-center items-center cursor-pointer"
              key={monster.index}>
              <Link to={`/monster/${monster.index}`}>
                <span className="block">{monster.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <span>{isFetching ? "Updating..." : ""}</span>
      </div>
      <div className="w-[300px] flex flex-col items-center bg-gray-400 p-4 rounded-md shadow-lg">
        <FavoriteList />
      </div>
    </div>
  );
};

export default MonsterList;
