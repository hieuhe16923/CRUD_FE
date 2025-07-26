import React, { useState } from 'react';
import ValidatedInput from '../../Components/Inputform';
import {
  validateEmail,
  validatePhone,
  validatePassword,
} from '../../Utils/validate';

const Home: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    email: '',
    phone: '',
    password: '',
  });

  const email = form.email;
  const phone = form.phone;
  const password = form.password;

  const setEmail = (value: string) => setForm({ ...form, email: value });
  const setPhone = (value: string) => setForm({ ...form, phone: value });
  const setPassword = (value: string) => setForm({ ...form, password: value });

  const handleSubmit = () => {
    setSubmitted(true);

    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);

    if (emailError) {
      document.getElementById('email')?.focus();
    } else if (phoneError) {
      document.getElementById('phone')?.focus();
    } else if (passwordError) {
      document.getElementById('password')?.focus();
    }

    if (!emailError && !phoneError && !passwordError) {
      alert('Form submitted successfully!');
    }
    if (emailError) {
      alert(`${emailError}`);
    }
    if (phoneError) {
      alert(`${phoneError}`);
    }
    if (passwordError) {
      alert(`${passwordError}`);
    }
  };

  return (
    <div className="h-screen flex items-center bg-gray-100">
      <div className="p-4 max-w-md mx-auto w-full bg-emerald-500 rounded-md shadow-md">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Validation Form
        </h1>

        <form
          onSubmit={e => {
            e.preventDefault(); // Ngăn reload
            handleSubmit();
          }}
        >
          <ValidatedInput
            id="email"
            label="Email"
            placeholder="example@email.com"
            value={email}
            setValue={setEmail}
            validationFn={validateEmail}
            submitted={submitted}
          />

          <ValidatedInput
            id="phone"
            label="Phone"
            placeholder="0981234567"
            value={phone}
            setValue={setPhone}
            validationFn={validatePhone}
            submitted={submitted}
          />

          <ValidatedInput
            id="password"
            label="Password"
            placeholder="123456"
            value={password}
            setValue={setPassword}
            validationFn={validatePassword}
            submitted={submitted}
            type="password"
          />

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
