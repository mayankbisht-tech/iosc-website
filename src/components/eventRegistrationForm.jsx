'use client';
import { useState } from 'react';
import { Orbitron } from 'next/font/google';
import axios from 'axios';

const orbitron = Orbitron({ weight: '900', subsets: ['latin'] });

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    // team: '',
    year: '',
    github: '',
    linkedin: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitOk, setSubmitOk] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email } = formData;

    if (!validateEmail(email)) {
      return alert('Please enter a valid email address.');
    }

    if (!formData.fullName || !formData.college || !formData.phone || !formData.branch || !formData.year) {
      return alert('Please fill out all required fields.');
    }

    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
      await axios.post(`${baseUrl}/register`, formData);

      setSubmitOk(true);
      setPopupMessage('Registration successful.');
      setShowPopup(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitOk(false);
      setPopupMessage('Registration failed. Please try again.');
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black text-white py-12 px-4 md:h-[100vh] w-[100vw] items-center md:px-20">
      <div className="max-w-4xl mx-auto bg-[#0c0c0c] p-6 md:p-10 rounded-2xl shadow-lg border border-gray-700">
        <h2 className={`${orbitron.className} text-3xl md:text-4xl text-sky-400 mb-8 text-center`}>
          IoSc-AIwithHassan

        </h2>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="Full Name" className="input" required />
            <input name="email" value={formData.email} onChange={handleChange} type="text" placeholder="Email" className="input" required />
            <input name="phone" value={formData.phone} onChange={handleChange} type="text" placeholder="Phone Number" className="input" required />
            <input name="year" value={formData.year} onChange={handleChange} type="text" placeholder="Graduation Year" className="input" required />
            <input name="branch" value={formData.branch} onChange={handleChange} type="text" placeholder="Branch" className="input" required />
            <select name="college" value={formData.college} onChange={handleChange} className="input bg-black border-white" required>
              <option value="" className="text-black">Select School</option>
              <option value="USAR" className="text-black">USAR</option>
              <option value="USAP" className="text-black">USAP</option>
              <option value="USDI" className="text-black">USDI</option>
              <option value="USMC" className="text-black">USMC</option>
            </select>
            {/* <select name="team" value={formData.team} onChange={handleChange} className="input bg-black border-white" required> */}
              {/* <option value="" className="text-black">Select Team </option>
              <option value="Team I3" className="text-black">Team I3</option>
              <option value="Team I5" className="text-black">Team I5</option>
              <option value="Team I7" className="text-black">Team I7</option>
              <option value="Team I9" className="text-black">Team I9</option>
              <option value="Team ARC" className="text-black">Team ARC</option>
            </select> */}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input name="github" value={formData.github} onChange={handleChange} type="url" placeholder="GitHub Profile Link (optional)" className="input" />
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} type="url" placeholder="LinkedIn Profile Link (optional)" className="input" />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-8 w-full font-bold py-3 rounded-xl transition duration-300 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-8 max-w-sm w-full shadow-2xl text-center">
            <h3 className={`text-xl font-bold mb-4 ${submitOk ? 'text-green-600' : 'text-red-500'}`}>
              {submitOk ? 'Registration Successful!' : 'Registration Unsuccessful!'}
            </h3>
            <p className="mb-6">{popupMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className={`text-white px-4 py-2 rounded ${submitOk ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventRegistrationForm;


