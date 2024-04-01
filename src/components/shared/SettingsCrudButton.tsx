//import Styles from './SettingsCrudButton.module.css'

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { SettingsBtnProps } from "./shared";

function SettingsCrudButton({
  id,
  settingItems,
  callsToAction,
  handleConfirmDlgOpen,
}: SettingsBtnProps) {
  const navigate = useNavigate();

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
}

export default SettingsCrudButton;
