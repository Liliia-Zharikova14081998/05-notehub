import type { Note } from "./note";

export interface PaginatedNotes {
    notes: Note[];
    page: number;
    totalNumberOfPages: number;
}