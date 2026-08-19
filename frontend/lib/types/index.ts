import type { components } from './api';

// Tickets
export type TicketRead = components["schemas"]["TicketRead"];
export type TicketCreate = components["schemas"]["TicketCreate"];
export type TicketUpdate = components["schemas"]["TicketUpdate"];
export type PaginatedTickets = components["schemas"]["PaginatedTickets"];

// Comments
export type CommentCreate = components["schemas"]["CommentCreate"];

// Status change
export type StatusChange = components["schemas"]["StatusChange"];

export type TicketState = components["schemas"]["State"];
export type TicketPriority = components["schemas"]["Priority"]
;
