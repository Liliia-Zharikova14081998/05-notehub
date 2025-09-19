export interface Note {
    id: string;
    title: string;
    content: string;
    tag: string;
}

export interface CreateNoteData { 
    title: string;
    content: string;
    tag?: string;
}

export interface PaginatedNotes {
    notes: Note[];
    page: number;
    totalPages: number;
}