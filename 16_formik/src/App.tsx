import { useState } from 'react'
import './App.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

interface FormValues {
  name: string
  email: string
  password: string
}

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
})

function App() {
  const initialValues: FormValues = { name: '', email: '', password: '' };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
          <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={(values) => console.log(values)}>
            {({ values, handleChange, handleSubmit, isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Field type="text" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default App
