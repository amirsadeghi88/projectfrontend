import React, { useEffect, useState } from "react";
import { Pet } from "../src/types";
import { api } from "../src/utils";

const Pets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [form, setForm] = useState<Omit<Pet, "id">>({
    name: "",
    species: "",
    breed: "",
    age: 0,
  });

  const fetchPets = async () => {
    const res = await api.get("/pets");
    setPets(res.data);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "age" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/pets", form);
    setForm({ name: "", species: "", breed: "", age: 0 });
    fetchPets();
  };

  return (
    <div>
      <h1>Pets</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="species"
          value={form.species}
          onChange={handleChange}
          placeholder="Species"
          required
        />
        <input
          name="breed"
          value={form.breed}
          onChange={handleChange}
          placeholder="Breed"
        />
        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <button type="submit">Add Pet</button>
      </form>

      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.name} ({pet.species}) - Age: {pet.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pets;
