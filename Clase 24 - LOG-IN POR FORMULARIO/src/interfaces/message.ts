import { newMessage } from './newMessage'

export interface message extends newMessage {
    id: number
    time: string
    dateString: string
  }