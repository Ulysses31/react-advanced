// import Styles from './ShowDtoInfo.module.css'

interface ShowDtoInfoProps {
  data: any;
}

function ShowDtoInfo({ data }: ShowDtoInfoProps) {
  return (
    <pre className="bg-white dark:bg-gray-800 dark:text-cyan-500 p-3 h-96 mb-6 overflow-auto shadow-md">
      <code className="text-sm">{data && JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}

export default ShowDtoInfo;
