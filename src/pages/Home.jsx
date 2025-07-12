import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="p-4 flex gap-2 items-center flex-col">
        <img src="/message-view/message-view.svg" alt="message-view icon" height={60} width={60} />
        <h1 className="text-4xl text-indigo-900 font-bold">Message View</h1>
      </div>
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl text-indigo-900 font-bold">Description: </h2>
        <div className="p-2">This is a simple tool to visualize any protocol messages.</div>
        <table className="mt-4 w-full">
          <tbody>
            <tr>
              <td>
                <Link to="/fix" className="text-lg text-indigo-600 hover:text-indigo-700">Visualize FIX Msg</Link>
              </td>
              <td>You can paste your FIX message in the next page and visualize it.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home;
