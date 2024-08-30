import React, { useEffect } from 'react';
import { useSidebarContext } from "@/context/SidebarContext";
import Options from "./Options/Options";
import { RoleProps } from '@/types/roles.types';
import Link from 'next/link';

const transformString = (str: string) => {
  const normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const withoutSpaces = normalized.replace(/\s+/g, '');
  return withoutSpaces.charAt(0).toLowerCase() + withoutSpaces.slice(1);
}


const Role: React.FC<RoleProps> = ({ role }) => {
    const { isExpanded, isDropdown, menuDropdown } = useSidebarContext();
    const router = transformString(role.rolName);

    const toggleMenu = () => {
        let state = null;
        if (isDropdown === role.rolName) state = null;
        else state = role.rolName;
        menuDropdown(state);
    };

    useEffect(() => {
        if (!isExpanded) menuDropdown(null)
    }, [isExpanded, menuDropdown])

    if (role.router) {
    return (
        <>
            <li>
            <Link
                    href={`/dashboard/${router}`}
                    className={`flex h-12 w-full items-center border-l-4 border-transparent text-gray-300 p-4 pl-5 ${isExpanded ? "hover:bg-gray-400/20 hover:border-blue-500" : "pointer-events-none cursor-none"
                        }`}
                   >
                    <svg
                        className="flex-shrink-0 w-6 h-6 text-gray-300 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={role.icon} />
                    </svg>
                    <span
                        className={`font-[500] flex-1 ml-3 text-left whitespace-nowrap transition-all duration-700 delay-200 ${isExpanded ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {role.rolName}
                    </span>
                </Link>
            </li>
        </>
    )
  } else {

    return (
      <>
          <li>
              <button
                  className={`flex h-12 w-full items-center border-l-4 border-transparent text-gray-300 p-4 pl-5 ${isExpanded ? "hover:bg-gray-400/20 hover:border-blue-500" : "pointer-events-none cursor-none"
                      }`}
                  aria-controls="dropdown-1"
                  onClick={toggleMenu}
                  aria-expanded={isDropdown == role.rolName}
              >
                  <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-300 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={role.icon} />
                  </svg>
                  <span
                      className={`font-[500] flex-1 ml-3 text-left whitespace-nowrap transition-all duration-700 delay-200 ${isExpanded ? "opacity-100" : "opacity-0"
                          }`}
                  >
                      {role.rolName}
                  </span>
                  <span
                      className={`ml-auto text-right whitespace-nowrap text-xs transition-all duration-700 ${isExpanded ? "opacity-100" : "opacity-0"
                          } ${isDropdown == role.rolName ? 'rotate-180' : ''}`}
                  >
                      {!role.router ? "▽" : ""}
                  </span>
              </button>
              <ul id="dropdown-example" className={`${isDropdown == role.rolName ? 'block' : 'hidden'}`}>
                  {role.options && role.options.map((option, index) => (
                      <Options key={index} option={option} />
                  ))}
              </ul>
          </li>
      </>
  )
}
}
export default Role;
