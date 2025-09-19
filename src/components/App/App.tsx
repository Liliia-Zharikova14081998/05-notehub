import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';  
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import type { PaginatedNotes } from '../../types/note';


export default function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isError } = useQuery<PaginatedNotes>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox value={search} onSearch={setSearch} />
		<Pagination
          currentPage={page}
          totalPages={data ? data.totalPages : 1}
          onPageChange={setPage} />
        <button className={css.button} onClick={openModal}>Create note +</button>
        </header>
        <NoteList
          notes={data?.notes || []}
          isLoading={isLoading}
          isError={isError} />
  { isModalOpen && (
        <Modal onClose={closeModal}>
      <NoteForm onClose={closeModal} />
        </Modal>  
  )}
</div> 
  );  
}