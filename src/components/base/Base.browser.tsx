// import styles from './Base.browser.module.css'
import {
  ArrowPathIcon,
  PencilIcon,
  PhoneIcon,
  PlayCircleIcon,
  PlusIcon,
  ServerIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Table } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../template/ConfirmDialog";
import { navigation } from "../../template/NavBar";
import ErrorMessage from "../shared/ErrorMessage";
import Loading from "../shared/Loading";
import SettingsCrudButton from "../shared/SettingsCrudButton";
import ShowDtoInfo from "../shared/ShowDtoInfo";
import {
  deleteDlgDescr,
  deleteDlgTitle,
  getDtoColumnHeaders,
  getIcon,
} from "../shared/shared";

interface BaseBrowserProps {
  title: string;
  queryFn: () => UseQueryResult<any, Error>;
  mutationFn: (id: number) => Promise<void>;
}

interface TableHeadProps {
  columns: string[];
}

interface TableRowProps {
  index: number;
  columns: any;
  item: any;
  handleConfirmOpenDlg: (e: boolean, id: number) => void;
  settingItems: {
    name: string;
    description: string;
    href: string;
    icon: any;
  }[];
  callsToAction: {
    name: string;
    href: string;
    icon: any;
  }[];
}

const TableHead = ({ columns }: TableHeadProps) => {
  return (
    <Table.Head>
      {columns &&
        columns.map((column: string, index: number) => (
          <Table.HeadCell
            key={index}
            className="text-center bg-gray-300 font-bold text-sm"
          >
            {column}
          </Table.HeadCell>
        ))}
      <Table.HeadCell className="bg-gray-300">
        <span className="sr-only">Edit</span>
      </Table.HeadCell>
    </Table.Head>
  );
};

const TableRow = ({
  index,
  columns,
  item,
  handleConfirmOpenDlg,
  settingItems,
  callsToAction,
}: TableRowProps) => {
  return (
    <Table.Row
      key={index}
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
    >
      {columns.map((column: string, index: number) => (
        <Table.Cell
          key={index}
          className="mytd dark:border-gray-700 whitespace-nowrap font-medium text-gray-600 dark:text-cyan-500"
        >
          {item[column]}
        </Table.Cell>
      ))}
      <Table.Cell>
        <div className="text-center font-medium text-cyan-600 hover:underline dark:text-cyan-500">
          <SettingsCrudButton
            id={item[columns[0]]}
            handleConfirmDlgOpen={handleConfirmOpenDlg}
            settingItems={settingItems}
            callsToAction={callsToAction}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

function BaseBrowser({ title, queryFn, mutationFn }: BaseBrowserProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);

  //**** Delete Confirm Dialog ******/
  const [confirmDeleteDlgOpen, setDeleteConfirmDlgOpen] = useState(false);
  const [idForDelete, setIdForDelete] = useState(0);
  //**** Delete Confirm Dialog ******/

  const { data, error, isPending, refetch, isFetching } = queryFn();
  const columns = data && data.length > 0 && getDtoColumnHeaders(data);

  const settingItems = [
    {
      name: "Edit",
      description: "Edit details for the current record",
      href: `/${title.toLowerCase()}/`,
      icon: PencilIcon,
    },
    {
      name: "Delete",
      description: "Delete current selected record",
      href: "#",
      icon: TrashIcon,
    },
  ];

  const callsToAction = [
    { name: "Watch demo", href: "#", icon: PlayCircleIcon },
    { name: "Contact sales", href: "#", icon: PhoneIcon },
  ];

  const handleConfirmOpenDlg = (e: boolean, id: number) => {
    setDeleteConfirmDlgOpen(e);
    setIdForDelete(id);
  };

  const handleConfirmCloseDlg = (e: boolean) => {
    setDeleteConfirmDlgOpen(e);
    e && mutation.mutate(idForDelete);
  };

  // Mutations
  const mutation = useMutation({
    mutationKey: [title, idForDelete],
    retry: 0,
    mutationFn: async (id: number) => await mutationFn(id),
    onMutate: (result) => {
      console.log("onMutate", result);
    },
    onError: (error, data, context) => {
      console.log("onError", error, data, context);
    },
    onSuccess: (data, variables, context) => {
      console.log("onSuccess", idForDelete, data, variables, context);
      queryClient.invalidateQueries();
      toast.success("Data deleted successfully");
    },
  });

  return (
    <>
      <ConfirmDialog
        title={deleteDlgTitle}
        description={deleteDlgDescr}
        opened={confirmDeleteDlgOpen}
        handleClose={handleConfirmCloseDlg}
      />
      <header className="bg-white dark:bg-gray-800 shadow-md mb-6">
        <div className="flex place-content-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="flex text-2xl font-bold tracking-tight text-gray-500 dark:text-cyan-500">
            {getIcon(navigation, title)}
            {title}
          </h1>
          <div className="flex space-x-2">
            <PlusIcon
              className="h-8 w-8 inline-block text-cyan-600 dark:text-cyan-500 cursor-pointer"
              title="Add new record"
              onClick={() => navigate(`/${title.toLowerCase()}/0`)}
            />
            <ArrowPathIcon
              className="h-8 w-8 inline-block text-cyan-600 dark:text-cyan-500 cursor-pointer"
              title="Refresh data"
              onClick={() => refetch()}
            />
            <ServerIcon
              className="h-8 w-8 inline-block text-cyan-600 dark:text-cyan-500 cursor-pointer"
              title="Show data model"
              onClick={() => setShowModel(!showModel)}
            />
          </div>
        </div>
      </header>

      {(isPending || isFetching) && <Loading />}

      {error && <ErrorMessage error={error} />}

      {showModel && (
        <>{!isPending && !isFetching && <ShowDtoInfo data={data} />}</>
      )}

      {data && data.length === 0 && !isPending && !isFetching && (
        <div className="shadow-md p-5 bg-white dark:bg-gray-800 dark:text-cyan-500">
          <p className="text-center font-bold text-gray-500 dark:text-cyan-500">
            No data found
          </p>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="overflow-x-visible shadow-md">
          {!isPending && !isFetching && (
            <Table striped hoverable className="mytable">
              <TableHead columns={columns} />
              <Table.Body className="divide-y">
                {data.map((item: any, index: number) => (
                  <TableRow
                    key={index}
                    index={index}
                    columns={columns}
                    item={item}
                    handleConfirmOpenDlg={handleConfirmOpenDlg}
                    settingItems={settingItems}
                    callsToAction={callsToAction}
                  />
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      )}
    </>
  );
}

export default BaseBrowser;
