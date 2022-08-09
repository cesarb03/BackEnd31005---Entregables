import { newMessage } from './newMessage'

export interface message extends newMessage {
  time: string
  dateString: string
}