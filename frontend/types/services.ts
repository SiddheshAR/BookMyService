
export interface Offerings {
    _id: string; // _id as a string from the backend
    name: string;
    price: number;
  }


  export interface ServiceSession {
    _id: string; // Assuming IDs are returned as strings from the backend
    userId: string;
    userName: string;
    userPhoneNumber?: string;
    serviceProviderNumber?: string;
    serviceProviderId?: string;
    serviceProviderName?: string;
    service: string;
    time: string; // Dates are often handled as strings in JSON
    location: string;
    managerId?: string;
    status: 'pending' | 'confirmed' | 'completed' | 'started' | 'cancelled';
    duration?: number;
    basePrice?: number;
    totalPrice?: number;
    feedback?: string;
    confirmationCode?: string;
    offerings?: Offerings[]; // Array of offerings with _id
    createdAt?: string;
    updatedAt?: string;
  }
