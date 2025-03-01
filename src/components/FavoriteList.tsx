import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Monster {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  armor_class: { type: string; value: number }[];
  hit_points: number;
  speed: Record<string, string>;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: { value: number; proficiency: { name: string } }[];
  damage_immunities: string[];
  damage_resistances: string[];
  damage_vulnerabilities: string[];
  senses: Record<string, string | number>;
  languages: string;
  challenge_rating: number;
  special_abilities: { name: string; desc: string }[];
  actions: { name: string; desc: string }[];
  legendary_actions?: { name: string; desc: string }[];
  image: string;
}
const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    },
  });
};
const FavoriteList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: favorites = [] } = useFavorites();

  const addFavorite = (newFavorite: Monster) => {
    const updateFavorites = [...favorites, newFavorite];
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
    queryClient.invalidateQueries({ queryKey: ["favorites"] });
    return addFavorite;
  };
  const removeFavorite = (index: string) => {
    const updateFavorites = favorites.filter(
      (fav: Monster) => fav.index !== index
    );
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
    queryClient.invalidateQueries({ queryKey: ["favorites"] });
    return removeFavorite;
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-3">Favorite Monsters</h2>
      {favorites.length === 0 ? (
        <p>No Favorite Monster yet!</p>
      ) : (
        <ul>
          {favorites.map((monster: Monster) => (
            <li key={monster.index}>
              <Link to={`/monster/${monster.index}`}>
                <span>{monster.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteList;
