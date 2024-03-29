// import {Styles} from './Dashboard.module.css'

import { NewspaperIcon } from "@heroicons/react/24/outline";

function Dashboard() {
  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="flex text-2xl font-bold tracking-tight text-gray-500">
          <NewspaperIcon className="mr-2 h-7 w-7" aria-hidden="true" />
          Dashboard
        </h1>
      </div>
    </header>
  );
}

export default Dashboard;
