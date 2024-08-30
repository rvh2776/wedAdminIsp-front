"use client";
import { useSidebarContext } from '@/context/SidebarContext';
import { OptionType } from '@/types/roles.types';
import Link from 'next/link';
import React from 'react';
import SubOptions from './SubOptions/SubOptions';


const transformString = (str: string) => {
    const normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const withoutSpaces = normalized.replace(/\s+/g, '');
    return withoutSpaces.charAt(0).toLowerCase() + withoutSpaces.slice(1);
}



const Options = ({ option } : {option: OptionType}) => {
    const { isExpanded, isDropdownSub, subMenuDropdown } = useSidebarContext();
    const router = transformString(option.optionName);

    const toggleMenu = () => {
      let state = null;
      if (isDropdownSub === option.optionName) state = null;
      else state = option.optionName;
      subMenuDropdown(state);
    };


    if (option.router) {
        return (
            <li>
                <Link
                    href={`/dashboard/${router}`}
                    className={`flex h-12 w-full items-center border-l-4 border-transparent text-gray-400 p-4 pl-12 ${isExpanded ? "hover:bg-gray-400/20 hover:border-blue-500" : "pointer-events-none cursor-none"}`}
                >
                    {option.optionName}
                </Link>
            </li>
        )
    } else {
        return (
            <li>
                <button
                    className={`flex h-12 w-full items-center border-l-4 border-transparent text-gray-400 p-4 pl-12 ${isExpanded ? "hover:bg-gray-400/20 hover:border-blue-500" : "pointer-events-none cursor-none"}`}
                    onClick={toggleMenu}
                >
                    {option.optionName}
                    <span
                        className={`ml-auto text-right whitespace-nowrap transition-all text-[10px]  duration-700 ${isExpanded ? "opacity-100" : "opacity-0"
                            } ${isDropdownSub == option.optionName ? 'rotate-180' : ''}`}
                    >
                        {!option.router ? "▼" : ""}
                    </span>
                </button>
                <ul id="dropdown-example" className={`${isDropdownSub == option.optionName ? 'block' : 'hidden'}`}>
                    {option.subOptions && option.subOptions.map((subOption, index) => (
                        <SubOptions key={index} subOption={subOption} />
                    ))}
                </ul>
            </li>
        )
    }
}

export default Options;

