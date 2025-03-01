import { Link, useParams } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { useQuery } from "@tanstack/react-query";

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

const MonsterDetail = () => {
  const { monsterIndex } = useParams<{ monsterIndex: string }>();

  const { isLoading, data, error } = useQuery<Monster>({
    queryKey: ["monster", monsterIndex],
    queryFn: async () => {
      const response = await fetch(
        `https://www.dnd5eapi.co/api/monsters/${monsterIndex}`
      );
      return response.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const monsters = data as Monster;

  return (
    <div className="p-6 bg-gray-800 text-white rounded-xl shadow-lg max-w-3xl mx-auto gap-8 flex flex-col w-full">
      <Link to="/">
        <span className="bg-black text-white rounded-4xl border-2 border-white size-px-4 p-2 ">
          Back
        </span>
      </Link>
      <h1 className="text-3xl font-bold">{monsters.name}</h1>
      <p className="italic text-gray-400">
        {monsters.size},{monsters.type},{monsters.alignment}
      </p>
      <span>
        <FavoriteButton monster={monsters} />
      </span>
      <span className="flex justify-center">
        <img
          src={`https://www.dnd5eapi.co/api/2014/images/monsters/${monsterIndex}.png`}
          alt={monsters.name}
          style={{ maxWidth: "50%", height: "50%", borderRadius: "100%" }}
        />
      </span>
      <p>
        <strong>Armor Class : </strong>
        {monsters.armor_class.map((ac) => `${ac.type} ${ac.value}`).join(", ")}
      </p>
      <p>
        <strong>Hit Points : </strong>
        {monsters.hit_points}
      </p>
      <p>
        <strong>Speed : </strong>
        {Object.entries(monsters.speed)
          .map(([key, value]) => `${key} ${value}`)
          .join(" , ")}
      </p>
      <p>
        <strong>Strength : </strong>
        {monsters.strength}
      </p>
      <p>
        <strong>Dexterity : </strong>
        {monsters.dexterity}
      </p>
      <p>
        <strong> Constitution : </strong>
        {monsters.constitution}
      </p>
      <p>
        <strong>Intelligence : </strong>
        {monsters.intelligence}
      </p>
      <p>
        <strong>Wisdom : </strong>
        {monsters.wisdom}
      </p>
      <p>
        <strong>Charisma : </strong>
        {monsters.charisma}
      </p>
      <p>
        <strong>Proficiencies : </strong>
        {monsters.proficiencies.map((prof, idx) => (
          <li key={idx}>
            {prof.proficiency.name} : {prof.value}
          </li>
        ))}
      </p>
      <p>
        <strong>Immunities Damage : </strong>
        {monsters.damage_immunities}
      </p>
      <p>
        <strong>Damage Resistances : </strong>
        {monsters.damage_resistances}
      </p>
      <p>
        <strong>Damage Vulnerabilities : </strong>
        {monsters.damage_vulnerabilities}
      </p>
      <p>
        <strong>Senses : </strong>
        {Object.entries(monsters.senses).map(([key, value], idx) => (
          <li key={idx}>
            {key.toUpperCase()} : {value}
          </li>
        ))}
      </p>
      <p>
        <strong>Language : </strong>
        {monsters.languages}
      </p>
      <p>
        <strong>Challenge Rating : </strong>
        {monsters.challenge_rating}
      </p>
      <p>
        <strong>Special Abilities : </strong>
        {monsters.special_abilities.map((ability, idx) => (
          <li key={idx}>
            {ability.name} : {ability.desc}
          </li>
        ))}
      </p>
      <p>
        <strong>Actions : </strong>
        {monsters.actions.map((action, idx) => (
          <li key={idx}>
            <strong className="flex">{action.name}</strong> : {action.desc}
          </li>
        ))}
      </p>
      <p>
        <strong>Legendary Actions : </strong>
        {monsters.legendary_actions?.map((legendary, idx) => (
          <li key={idx}>
            <strong>{legendary.name}</strong> : {legendary.desc}
          </li>
        ))}
      </p>
    </div>
  );
};
export default MonsterDetail;
