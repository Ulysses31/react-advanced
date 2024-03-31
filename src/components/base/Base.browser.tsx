// import styles from './Base.browser.module.css'
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  ChevronDownIcon,
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
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../template/ConfirmDialog";
import { navigation } from "../../template/NavBar";

interface BaseBrowserProps {
  title: string;
  queryFn: () => UseQueryResult<any, Error>;
  mutationFn: (id: number) => Promise<void>;
}

function BaseBrowser({ title, queryFn, mutationFn }: BaseBrowserProps) {
  const deleteDlgTitle = `Delete ${title}`;
  const deleteDlgDescr =
    "Are you sure you want to delete this record? This action cannot be undone.";
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);

  //**** Delete Confirm Dialog ******/
  const [confirmDeleteDlgOpen, setDeleteConfirmDlgOpen] = useState(false);
  const [idForDelete, setIdForDelete] = useState(0);
  //**** Delete Confirm Dialog ******/

  const { data, error, isPending, refetch, isFetching } = queryFn();
  const columns = data && data.length > 0 && Object.keys(data[0]);
  const GetIcon: any = () =>
    navigation
      .find((item: any) => {
        return item.name === title;
      })
      ?.icon({}, 7, 7);

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

  interface SettingsBtnProps {
    id: any;
    handleConfirmDlgOpen: (e: boolean, id: number) => void;
  }

  const SettingsBtn = ({ id, handleConfirmDlgOpen }: SettingsBtnProps) => {
    return (
      <Popover className="relative">
        <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-500 dark:text-gray-400">
          <span>Options</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex max-w-sm -translate-x-72 px-4">
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white dark:bg-gray-800 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {settingItems.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex justify-center gap-x-6 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700">
                      <item.icon
                        className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="font-semibold text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200"
                        onClick={() => {
                          item.name === "Edit" && navigate(item.href + id);
                          item.name === "Delete" &&
                            handleConfirmDlgOpen(true, id);
                        }}
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </button>
                      <p className="mt-1 text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-200">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:bg-gray-800">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 dark:text-gray-400 hover:bg-gray-200 dark:hover:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <item.icon
                      className="h-5 w-5 flex-none text-gray-400 dark:text-gray-400 dark:hover:text-gray-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    );
  };

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
            <GetIcon />
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

      {(isPending || isFetching) && (
        <p className="flex m-5 justify-center place-items-center font-bold text-gray-400 dark:text-cyan-500">
          <ArrowPathIcon className="h-8 w-8 inline-block text-cyan-600 dark:text-cyan-500 mr-2 animate-spin" />
          Loading...
        </p>
      )}

      {error && (
        <div className="flex-col p-10 place-content-center text-center bg-white dark:bg-gray-800 shadow-md space-y-2 mb-6">
          <h2 className="font-bold text-4xl text-red-500 dark:text-red-400">
            Error
          </h2>
          <p className="font-normal text-lg text-gray-500 dark:text-cyan-500">
            An error occurred {error.message}
          </p>
        </div>
      )}

      {showModel && (
        <div>
          {!isPending && !isFetching && (
            <pre className="bg-white dark:bg-gray-800 dark:text-cyan-500 p-3 h-96 mb-6 overflow-auto shadow-md">
              <code className="text-sm">
                {data && JSON.stringify(data, null, 2)}
              </code>
            </pre>
          )}
        </div>
      )}

      {data && data.length === 0 && (!isPending && !isFetching) && (
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
              <Table.Body className="divide-y">
                {data.map((item: any, index: number) => (
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
                        <SettingsBtn
                          handleConfirmDlgOpen={handleConfirmOpenDlg}
                          id={item[columns[0]]}
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
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
