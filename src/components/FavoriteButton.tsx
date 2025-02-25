import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

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
  onToggleFavorite: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  monster,
  onToggleFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favorites.some(
      (fav: Monster) => fav.index === monster.index
    );
    setIsFavorite(exists);
  }, [monster.index]);

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updateFavorites;

    if (isFavorite) {
      updateFavorites = favorites.filter(
        (fav: Monster) => fav.index !== monster.index
      );
    } else {
      updateFavorites = [...favorites, monster];
    }

    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
    setIsFavorite(!isFavorite);

    onToggleFavorite();
  };

  return (
    <button onClick={handleFavoriteToggle}>
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
