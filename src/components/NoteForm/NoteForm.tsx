import { useQueryClient, useMutation } from "@tanstack/react-query";
import css from "./NoteForm.module.css"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useId } from "react"
import * as Yup from "yup"
import type { Note, CreateNoteData } from "../../types/note"
import { createNote } from "../../services/noteService";

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
const queryClient = useQueryClient();
  
  const createNoteMutation = useMutation <Note, Error, CreateNoteData>({
  mutationFn: createNote,
  onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['notes'] });
  onClose();    
    },
  });

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title must be at most 50 characters")
      .required("Title is required"),
    content: Yup.string()
      .max(500, "Content must be at most 500 characters"),
    tag: Yup.string()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
      .required("Tag is required"),
  });

const initialValues: CreateNoteData = {
  title: "",
  content: "",
  tag: "Todo",
  };
  
const handleSubmit = (values: CreateNoteData) => {
  createNoteMutation.mutate(values);
}  

  const fieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} component="span" />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} component="span" />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={false}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}