// src/components/Doctor/DoctorProfile.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    bioMessage: "",
    profileImage: null,
    appointments:null,
    slots:null
  });

  const [editing, setEditing] = useState(false);

  const token = localStorage.getItem("doctorToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(token);
        
        const res = await axios.get("http://localhost:5000/api/doctors/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        
        setDoctor(res.data);
        setFormData({
          name: res.data.name,
          specialization: res.data.specialization,
          experience: res.data.experience,
          bioMessage: res.data.bioMessage,
          profileImage: res.data.profileImage,
          appointments:res.data.appintments,
          slots:res.data.slots
        });
        console.log(`${res.data.profileImage}`);
        
      } catch (err) {
        console.error("Error fetching doctor profile:", err);
      }
    };
    fetchProfile();
   

  }, [token]);

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("specialization", formData.specialization);
      data.append("experience", formData.experience);
      data.append("bioMessage", formData.bioMessage);
      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
      }

      const res = await axios.put(
        `http://localhost:5000/api/doctors/${doctor._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated!");
      setDoctor(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!doctor) return <p>Loading profile...</p>;
  

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Doctor Profile</h2>

      <div className="flex flex-col items-center">
        <img
          src={`${doctor.profileImage}`}
          alt="Profile"
          style={{height:"300px"}}
        />
        {!editing ? (
          <>
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
            <p><strong>Bio:</strong> {doctor.bioMessage}</p>
            <p><strong>Appointments:</strong> </p>
            {doctor.appointments && Object.keys(doctor.appointments).length > 0 ? (
            <ul className="list-disc ml-6">
              {Object.entries(doctor.appointments).map(([key, value], index) => (
              <li key={index}>
                <strong>{key}:</strong> {value}
              </li>
              ))}
            </ul>
            ) : (
            <p className="ml-2 text-gray-500">No appointments available.</p>
             )}
             
            <p><strong>Slots:</strong> </p>
            {doctor.slots && Object.keys(doctor.slots).length > 0 ? (
              <ul className="list-disc ml-6">
                {Object.entries(doctor.slots).map(([key, value], index) => (
                  <li key={index}>
                  <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            ) : (
            <p className="ml-2 text-gray-500">No slots available.</p>
            )}

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4 w-full">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Specialization"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience (in years)"
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="bioMessage"
              value={formData.bioMessage}
              onChange={handleChange}
              placeholder="Bio"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;

