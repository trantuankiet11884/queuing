

// interface.ts
export interface Device {
    // Define your properties here.
    id: string;
    deviceCode: string;
    deviceName: string;
    ipAddress: string;
    deviceType: string;
    userName: string;
    password: string;
    serviceUse: string[];
    activeStatus?: boolean;
    connectionStatus?: boolean;
}

export interface ServiceType {
    id: string;
    serviceCode: string;
    serviceName: string;
    description: string;
    activeStatus: boolean;
}

export interface NumberType {
    id: string;
    stt: number;
    customerName: string;
    serviceName: string;
    fromDate: string ;
    toDate: string ;
    status: string;
    supply: string;
    phoneNumber?: string;
    email?: string;
}

export interface RoleType {
    id?: string;
    roleName: string;
    userNumber?: number;
    description: string;
    functionGroupA: boolean;
    functionGroupB: boolean;
    functionX: boolean;
    functionY: boolean;
    functionZ: boolean;
}

export interface AccountType {  
    id: string;
    userName: string; 
    fullName: string;
    phoneNumber: string;
    email: string;
    role: string;
    status: boolean;
    password: string;
    imageUrl: string;
}

export interface LogEntry {
    id?: string;
    activity: string;
    timestamp: string;
    userName: string;
    ipUsage: string;
}

export interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void
}