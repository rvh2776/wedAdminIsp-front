      export interface IOption {
            optionName: string;
            router: boolean;
            subOptions: ISubOption[];
          }

          export interface ISubOption {
            subOptionsName: string;
            router: boolean;
          }    

          export interface RoleProps {
            role: {
                rolName: string;
                icon: string;
                router: boolean;
                options: OptionType[];
            };
        }

        export interface OptionType {
            optionName: string;
            router: boolean;
            subOptions: SubOptionType[];
        }
        
        export interface SubOptionType {
            subOptionsName: string;
            router: boolean;
        }


        
