// import Styles from './UserProfile.module.css'

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    !isLoading && !isAuthenticated && (window.location.href = "/");
    return () => {};
  }, [isAuthenticated, isLoading]);

  return (
    !isLoading &&
    isAuthenticated && (
      <div className="shadow-md p-5 bg-white dark:bg-gray-800 mb-6">
        <div className="px-4 sm:px-0 flex items-center p-2">
          <img
            src={user?.picture}
            alt={user?.name}
            className="w-20 h-20 mr-5 rounded-full inline-block ring-2 ring-gray-200 dark:ring-gray-700"
          />
          <div className="flex-col">
            <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-cyan-500">
              User Information
            </h3>
            <p className="mt-0 max-w-2xl text-md leading-6 text-gray-500 dark:text-cyan-600">
              Personal details.
            </p>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-100 dark:border-gray-700">
          <dl className="divide-y divide-gray-100 dark:divide-gray-700">
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.name}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Middle Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.middle_name}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Family Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.family_name}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Given Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.given_name}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                NickName
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.nickname}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Preferred Username
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.preferred_username}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Birthdate
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.birthdate}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Gender
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.gender}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Email
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.email}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Email Verified
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.email_verified ? "Yes" : "No"}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Locale
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.locale}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.address}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Phone Number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.phone_number}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Phone Number Verified
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.phone_number_verified ? "Yes" : "No"}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                WebSite
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.website}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Zone Info
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.zoneinfo}
              </dd>
            </div>
            <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-bold leading-6 text-gray-900 dark:text-cyan-600">
                Sub
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.sub}
              </dd>
            </div>
          </dl>
        </div>
        {/* <p>{JSON.stringify(user, null, 2)}</p> */}
      </div>
    )
  );
}

export default UserProfile;
