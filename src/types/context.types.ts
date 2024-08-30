import { IUserData } from "./login.types";


      export interface IProviderProps {
        children: React.ReactElement
      }

      export interface IAuthContextProps {
            userData: IUserData | null;
            setUserData: (userData: IUserData) => void;
            login: (userData: IUserData) => void;
            logout: (userData: IUserData | null) => void;
            renewToken: (userData: IUserData | null) => void;
          }
       

        export interface ISidebarContextProps {
            btnFixed: boolean;
            sidebarFixed: (newState: boolean) => void;
            isExpanded: boolean;
            sidebarExpand: (newState: boolean) => void;
            isDropdown: string | null;
            menuDropdown: (newState: string | null ) => void;
            isDropdownSub: string | null;
            subMenuDropdown: (newState: string | null ) => void;
          }

          export interface ICampusContextProps {
            campusSelect: string | undefined;
            handleCampusSelect: (select: string) => void;
          }

          
          export interface IDarkContextProps {
            darkMode: boolean;
            handleDarkMode: (newState: boolean) => void;
          }
