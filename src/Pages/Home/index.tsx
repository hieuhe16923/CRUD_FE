import React, { useState } from 'react';
import ValidatedInput from '../../Components/Inputform';
import { validateEmail, validatePhone } from '../../Utils/validate';

const Home: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    setSubmitted(true);

    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);

    if (!emailError && !phoneError) {
      alert('Form submitted successfully!');
    }
    if (emailError) {
      alert(`${emailError}`);
    }
    if (phoneError) {
      alert(`${phoneError}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Validation Form</h1>

      <ValidatedInput
        label="Email"
        placeholder="example@email.com"
        value={email}
        setValue={setEmail}
        validationFn={validateEmail}
        submitted={submitted}
      />

      <ValidatedInput
        label="Phone"
        placeholder="0981234567"
        value={phone}
        setValue={setPhone}
        validationFn={validatePhone}
        submitted={submitted}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default Home;
