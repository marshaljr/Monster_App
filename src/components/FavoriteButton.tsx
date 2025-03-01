import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
interface FavoriteButtonProps {
  monster: Monster;
}

const useFavorite = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => JSON.parse(localStorage.getItem("favorites") || "[]"),
  });
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ monster }) => {
  const queryClient = useQueryClient();
  const { data: favorites = [] } = useFavorite();

  const isFavorite = favorites.some(
    (fav: Monster) => fav.index === monster.index
  );

  const mutation = useMutation({
    mutationFn: (newFavorites: Monster) => {
      const updateFavorites = isFavorite
        ? favorites.filter((fav: Monster) => fav.index !== monster.index)
        : [...favorites, newFavorites];

      localStorage.setItem("favorites", JSON.stringify(updateFavorites));
      return updateFavorites;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });

  return (
    <button onClick={() => mutation.mutate(monster)}>
      <FontAwesomeIcon
        icon={isFavorite ? solidHeart : regularHeart}
        size="2x"
        className={
          isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
        }
      />
    </button>
  );
};

export default FavoriteButton;
