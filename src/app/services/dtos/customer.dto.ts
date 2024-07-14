export class CustomerRegistrationRequestDTO {

    firstName!: string
    lastName!: string
    email!: string
    customerId!: string
}


export class CustomerRegistrationResponseDTO {
    customerDetail!: UserProfileDTO
}

export class CustomerAuthenticationRequestDTO {
    userID!: string
    userPin!: string
}

export class CustomerAuthenticationResponseDTO {
    accessToken?: string
    refreshToken?: string
    customerDetail?: UserProfileDTO;
}

export class UserProfileDTO {
    userID?: string;
    userName?: string;
    customerPin?: string;
}

export class Customer {
    customerId!: string
    customerName!: string
}