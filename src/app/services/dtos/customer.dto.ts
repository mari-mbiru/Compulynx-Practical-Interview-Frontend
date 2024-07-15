export class CustomerRegistrationRequestDto {

    firstName!: string
    lastName!: string
    email!: string
    customerId!: string
}


export class CustomerRegistrationResponseDto {
    customerDetail!: UserProfileDto
}

export class CustomerAuthenticationRequestDto {
    userID!: string
    userPin!: string
}

export class CustomerAuthenticationResponseDto {
    accessToken?: string
    refreshToken?: string
    customerDetail?: UserProfileDto;
}

export class UserProfileDto {
    userID?: string;
    userName?: string;
    customerPin?: string;
}

export class CustomerDto {
    customerId!: string
    customerName!: string
}