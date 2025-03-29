import React from 'react';
import { RegistrationForm } from './components/RegistrationForm';

function App() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Create your account
        </h2>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;