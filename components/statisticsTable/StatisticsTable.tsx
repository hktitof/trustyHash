export default function StatisticsTable({ statistics }) {
    return (
      <section className="bg-white dark:bg-gray-900 shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Statistics</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-4 py-2 text-gray-800 dark:text-white">Statistic</th>
                <th className="px-4 py-2 text-gray-800 dark:text-white">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <td className="px-4 py-2 text-gray-800 dark:text-white">Total Proofs</td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{statistics.totalProofs}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <td className="px-4 py-2 text-gray-800 dark:text-white">Successful Verifications</td>
                <td className="px-4 py-2 text-gray-800 dark:text-white">{statistics.successfulVerifications}</td>
              </tr>
              {/* Add more rows for additional statistics */}
            </tbody>
          </table>
        </div>
      </section>
    );
  }