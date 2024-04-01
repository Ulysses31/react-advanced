// import Styles from './Loading.module.css'

import { ArrowPathIcon } from "@heroicons/react/24/outline";

function Loading() {
  return (
    <p className="flex m-5 justify-center place-items-center font-bold text-gray-400 dark:text-cyan-500">
      <ArrowPathIcon className="h-8 w-8 inline-block text-cyan-600 dark:text-cyan-500 mr-2 animate-spin" />
      Loading...
    </p>
  );
}

export default Loading;
