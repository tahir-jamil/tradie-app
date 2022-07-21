export enum StatusEnum {
  'scheduled',
  'active',
  'invoicing',
  'to priced',
  'completed',
}
export interface IJob {
  id: number
  status: StatusEnum
  date: string
  name: string
  description: string
  company: string
  createdAt: string
  client: {
    name: string
    email: string
    contact: string
  },
  notes: [
    {
      id: number
      title: string
    }
  ]
}
