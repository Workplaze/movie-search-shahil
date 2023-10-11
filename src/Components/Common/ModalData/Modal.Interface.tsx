
export  type roleType = {
    label: string;
    value: string;
  };
 export type statusType = {
    label: string;
    value: string;
  };
export  interface UserData {
    id?: string;
    last_name: string;
    first_name: string;
    age: number | string;
    phone: number | string;
    user_name: string;
    role: roleType;
    status: statusType;
  }
 export interface UserDataPayload {
    id?: string;
    last_name: string;
    first_name: string;
    age: number | string;
    phone: number | string;
    user_name: string;
    role_id: string;
    status_id: string;
  }
  
 export interface MyDialogProps {
    open: boolean;
    handleClose: () => void;
    id: string;
    refetchUser: ()=> void;
    statusRoleData:any;
    isStatusRoleLoading:boolean;
  }