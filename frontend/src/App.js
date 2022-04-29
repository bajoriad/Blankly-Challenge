import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';
import { format, compareAsc } from 'date-fns'

// import '../'
function App() {
  const [data, setData] = useState([])
  const [message, setMessage] = useState('')

  async function getData() {
    let response = await axios.get('http://127.0.0.1:5000/get')
    setData([...response.data])
  }


  useEffect(() => {
    getData()
  }, [])

  function truncate(str) {
    return str.length > 20 ? str.substring(0, 10) : str;
  }

  async function addData() {
    try {
      await axios.post('http://127.0.0.1:5000/add', { message, timestamp: Date.now() })
      getData()
      setMessage('')
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="App">
      <div className="flex justify-center items-center flex-col space-y-3 w-2/3 mx-auto">
        <img className="rounded-full" src="/imag.jpeg"></img>
        <h1 className="text-3xl font-bold">Hi, I'm Divyanga Bajoria</h1>
        <p className="text-lg font-base">I am a junior at the University of Michigan, pursuing a major in Computer Science and a minor in Mathematics and Business.
          I transferred over here in Fall 2019 after having spent a year of college at Sinagpore Management University, Singapore. Having
          stayed in India, Singapore and now in America, has enriched me with diverse experiences and allowed me to see the world through different
          lenses. I hope to share this unqiue perspective with my colleagues at Blankly finance.
        </p>
      </div>

      <div class="max-w-2xl mx-auto my-10">

        <div class="flex flex-col">
          <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden ">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr>

                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Encrypted
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Message
                      </th>
                      <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {
                      data.map((x) => (
                        <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{truncate(x.encrypted_message)}</td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{truncate(x.original_message)}</td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{format(x.timestamp, 'MM/dd/yyyy')}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 mt-6">
          <div>
            <input type="text" className="w-full bg-slate-50 px-3 py-2 rounded-lg border-slate-300" placeholder="Enter message" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div>
            <button onClick={addData} className="w-full px-3 py-2 text-white bg-black rounded">Add Message</button>
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
