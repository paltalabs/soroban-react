import { Prepare, Instructions } from './types';
import { RippleAPI } from '..';
export interface Ticket {
    account: string;
    sequence: number;
}
declare function prepareTicketCreate(this: RippleAPI, address: string, ticketCount: number, instructions?: Instructions): Promise<Prepare>;
export default prepareTicketCreate;
//# sourceMappingURL=ticket.d.ts.map