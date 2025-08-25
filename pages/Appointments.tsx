import React, { useEffect, useState } from "react";
import { Appointment, Pet } from "../src/types";
import { api } from "../src/utils";

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [form, setForm] = useState<Omit<Appointment, "id">>({
    date: new Date().toISOString().slice(0, 16), // for input[type="datetime-local"]
    vet: "",
    notes: "",
    petId: "",
  });

  const [editId, setEditId] = useState<string | null>(null);

  const fetchAppointments = async () => {
    const res = await api.get("/appointments");
    setAppointments(res.data);
  };

  const fetchPets = async () => {
    const res = await api.get("/pets");
    setPets(res.data);
  };

  useEffect(() => {
    fetchAppointments();
    fetchPets();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/appointments/${editId}`, form);
      setEditId(null);
    } else {
      await api.post("/appointments", form);
    }
    setForm({
      date: new Date().toISOString().slice(0, 16),
      vet: "",
      notes: "",
      petId: "",
    });
    fetchAppointments();
  };

  const handleEdit = (appt: Appointment) => {
    setEditId(appt.id);
    setForm({
      date: new Date(appt.date).toISOString().slice(0, 16),
      vet: appt.vet,
      notes: appt.notes ?? "",
      petId: appt.petId,
    });
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/appointments/${id}`);
    fetchAppointments();
  };

  return (
    <div>
      <h1>Appointments</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Vet:
          <input name="vet" value={form.vet} onChange={handleChange} required />
        </label>
        <label>
          Notes:
          <textarea name="notes" value={form.notes} onChange={handleChange} />
        </label>
        <label>
          Pet:
          <select
            name="petId"
            value={form.petId}
            onChange={handleChange}
            required
          >
            <option value="">Select Pet</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name} ({pet.species})
              </option>
            ))}
          </select>
        </label>
        <button type="submit">
          {editId ? "Update" : "Create"} Appointment
        </button>
        {editId && <button onClick={() => setEditId(null)}>Cancel Edit</button>}
      </form>

      <ul>
        {appointments.map((appt) => (
          <li key={appt.id}>
            <strong>{new Date(appt.date).toLocaleString()}</strong> - {appt.vet}{" "}
            for {pets.find((p) => p.id === appt.petId)?.name || "Unknown Pet"}
            <br />
            <small>{appt.notes}</small>
            <br />
            <button onClick={() => handleEdit(appt)}>Edit</button>
            <button onClick={() => handleDelete(appt.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
