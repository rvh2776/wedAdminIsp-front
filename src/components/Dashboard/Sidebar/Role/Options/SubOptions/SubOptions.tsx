import { useSidebarContext } from '@/context/SidebarContext';
import { SubOptionType } from '@/types/roles.types';
import Link from 'next/link';
import React from 'react';

const transformString = (str: string) => {
    const normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const withoutSpaces = normalized.replace(/\s+/g, '');
    return withoutSpaces.charAt(0).toLowerCase() + withoutSpaces.slice(1);
}

const SubOptions = ({ subOption } : {subOption: SubOptionType}) => {
    const { isExpanded } = useSidebarContext();
    const router = transformString(subOption.subOptionsName);

    return (
        <li>
            <Link
                href={`/dashboard/${router}`}
                className={`flex h-12 w-full items-center border-l-4 border-transparent text-gray-400 p-4 pl-12 ${isExpanded ? "hover:bg-gray-400/20 hover:border-blue-500" : "pointer-events-none cursor-none"}`}
            >
                {subOption.subOptionsName}
            </Link>
        </li>
    )
}

export default SubOptions;
