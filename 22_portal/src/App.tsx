import { useState } from 'react';
import './App.css'
import Modal from './components/Modal'
import DropdownExample from './components/DropdownExample';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Hello, ${name}!`);
    closeModal();
    setName('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
        <button
          onClick={openModal}
          className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        >
          Open Modal
        </button>
      </div>
      <DropdownExample/>
      <Modal isOpen={isModalOpen} onClose={closeModal} >
        <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter your name:
            </label>
            <input
              type="text"
              value={name}
              aria-label='name'
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 font-medium text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>

  )
}

export default App
