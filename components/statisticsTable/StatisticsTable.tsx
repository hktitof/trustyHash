export default function StatisticsTable({}) {
  return (
    <>
      <div className="flex  items-center justify-center  ">
        <div className="flex items-center justify-center ">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Asset ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Owner Address
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Hash Value
                    </th>
                    <th scope="col" className="py-3 px-6">
                      TimeStamp
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Owner Note
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="py-4 px-6">12345</td>
                    <td className="py-4 px-6">0xAbCd1234EfGh5678</td>
                    <td className="py-4 px-6">a94a8fe5ccb19ba61c4c0873d391e987982fbbd3</td>
                    <td className="py-4 px-6">2024-08-10 12:34 PM</td>
                    
                    <td className="py-4 px-6">Asset verified successfully.</td>
                  </tr>

                  <tr className="bg-gray-50 border-b">
                    <td className="py-4 px-6">67890</td>
                    <td className="py-4 px-6">0xEfGh5678IjKl9101</td>
                    <td className="py-4 px-6">74e6f7298a9c2d168935f58c001bad88f5f5fd85</td>
                    <td className="py-4 px-6">2024-08-10 12:40 PM</td>
                    <td className="py-4 px-6">Verification in process.</td>
                  </tr>

                  <tr className="bg-white border-b">
                    <td className="py-4 px-6">54321</td>
                    <td className="py-4 px-6">0xIjKl4321MnOp2345</td>
                    <td className="py-4 px-6">26ab0db90d72e28ad0ba1e22ee510510d0d4a3c5</td>
                    <td className="py-4 px-6">2024-08-10 12:50 PM</td>
                    <td className="py-4 px-6">Hash mismatch detected.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-white font-semibold py-10 text-center -mt-20">
        Made with{" "}
        <a
          href="https://chat.openai.com/g/g-8gGyAPc6i-material-tailwind-gpt"
          className="text-white hover:text-gray-800"
          target="_blank"
          rel="noreferrer"
        >
          MT GPT
        </a>
        based on
        <a
          href="https://www.material-tailwind.com"
          className="text-blueGray-500 hover:text-blueGray-800"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Material Tailwind Framework
        </a>
        .
      </div>
    </>
  );
}
