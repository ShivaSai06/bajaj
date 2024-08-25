"use client"

import React, { useState } from "react"

const Form = () => {
  const [jsonInput, setJsonInput] = useState("")
  const [jsonError, setJsonError] = useState("")
  const [selectedOptions, setSelectedOptions] = useState([])
  const [response, setResponse] = useState()

  console.log("process.env.NEXT_PUBLIC_BACKEND", process.env.NEXT_PUBLIC_BACKEND)

  const validateJson = input => {
    try {
      const parsed = JSON.parse(input)
      if (!parsed.data || !Array.isArray(parsed.data) || !parsed.data.every(item => typeof item === "string")) {
        throw new Error("Invalid JSON format")
      }
      setJsonError("")
    } catch (error) {
      setJsonError("Invalid JSON input")
    }
  }

  const handleJsonChange = e => {
    const input = e.target.value
    setJsonInput(input)
    validateJson(input)
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Handle form submission here
  }

  const handleSelectChange = e => {
    const value = e.target.value
    setSelectedOptions(prev => (prev.includes(value) ? prev.filter(option => option !== value) : [...prev, value]))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label htmlFor="jsonInput" className="block text-sm font-medium text-gray-700">
          JSON Input
        </label>
        <textarea
          id="jsonInput"
          value={jsonInput}
          onChange={handleJsonChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows="4"
          placeholder='{ "data": ["A","C","z","12"] }'
        />
        {jsonError && <p className="mt-2 text-sm text-red-600">{jsonError}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          console.log("jsonInput", jsonInput)
          fetch("/api/bfhl", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonInput,
          })
            .then(response => response.json())
            .then(data => {
              console.log("Success:", data)
              setResponse(data)
            })
        }}>
        Submit
      </button>

      <div>
        <label className="block text-sm font-medium text-gray-700">Select Options</label>
        <div className="mt-1">
          {["alphabets", "numbers", "highest_lowercase_alphabet"].map(option => (
            <label key={option} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={handleSelectChange}
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-sm text-gray-700">
                {option === "highest_lowercase_alphabet"
                  ? "Highest lowercase alphabet"
                  : option.charAt(0).toUpperCase() + option.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>Filtered Response</div>

      <div>
        {response ? (
          <div>
            {selectedOptions.map(option => {
              if (option == "alphabets") {
                return (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Alphabets</label>
                    <div className="mt-1">
                      {response[option].map(alphabet => (
                        <span className="inline-flex items-center mr-4">{alphabet}</span>
                      ))}
                    </div>
                  </div>
                )
              }
              if (option == "numbers") {
                return (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Numbers</label>
                    <div className="mt-1">
                      {response[option].map(number => (
                        <span className="inline-flex items-center mr-4">{number}</span>
                      ))}
                    </div>
                  </div>
                )
              }
              if (option == "highest_lowercase_alphabet") {
                return (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Highest Lowercase Alphabet</label>
                    <div className="mt-1">
                      {response[option].map(alphabet => (
                        <span className="inline-flex items-center mr-4">{alphabet}</span>
                      ))}
                    </div>
                  </div>
                )
              }
            })}
          </div>
        ) : (
          <div>No Result</div>
        )}
      </div>
    </form>
  )
}

export default Form


// {"data":["A","C","Z","c","i"]}