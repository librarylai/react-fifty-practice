import React, { useState } from 'react'
import styled from 'styled-components'

const NotesPageContainer = styled.div`
  padding: 10px;
  width: 100%;
  height: 100vh;
  background: linear-gradient(150deg, rgba(2, 0, 36, 1) 0%, rgba(0, 209, 255, 0.5676864495798319) 0%, rgba(74, 163, 228, 1) 100%);
`

const NoteContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 400px;
  margin: 20px;
  box-sizing: border-box;
`

const NoteToolsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #4dd363;
  padding: 6px;
  gap: 6px;
  button {
    cursor: pointer;
    outline: none;
    border: none;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.75);
  }
`

const Textarea = styled.textarea<{ isEditMode: boolean }>`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 1.1rem;
  padding: 10px;
  box-sizing: border-box;
  display: ${({ isEditMode }) => (isEditMode ? 'block' : 'none')};
`

const Mask = styled.div<{ isEditMode: boolean }>`
  width: 100%;
  height: 100%;
  font-size: 1.1rem;
  padding: 10px;
  box-sizing: border-box;
  display: ${({ isEditMode }) => (isEditMode ? 'none' : 'block')};
`

export default function NotesPage() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [noteText, setNoteText] = useState('Hello World')
  console.log('isEditMode', isEditMode)
  return (
    <NotesPageContainer>
      <NoteContainer>
        <NoteToolsContainer>
          <button onClick={() => setIsEditMode(!isEditMode)}>Edit</button>
          <button>Delete</button>
        </NoteToolsContainer>
        <Mask isEditMode={isEditMode}>{noteText}</Mask>
        <Textarea isEditMode={isEditMode} value={noteText} onChange={(e) => setNoteText(e.target.value)}></Textarea>
      </NoteContainer>
    </NotesPageContainer>
  )
}
