export interface Features {
  callForwardNoReply: {
    provisioned: boolean
    destination: string
  }
}

export interface User {
  _id: string
  phoneNumber: string
  username: string
  password: string
  domain: string
  status: string
  features: Features
}
