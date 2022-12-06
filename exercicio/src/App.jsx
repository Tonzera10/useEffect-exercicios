import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './styles.css'

const TarefaList = styled.ul`
  padding: 0;
  width: 200px;
`

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({ completa }) => (completa ? 'line-through' : 'none')};
`

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`

function App() {
  const [tarefas, setTarefa] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filtro, setFiltro] = useState("")

  useEffect(
    () => {
      if(tarefas.length > 0) {
        const tarefasEmString = JSON.stringify(tarefas)
        localStorage.setItem("ArrayDeTarefas", tarefasEmString)
      }
    }, 
    [tarefas]
  );

  useEffect(
    () => {
      const lista = JSON.parse(localStorage.getItem("ArrayDeTarefas"))
      if(lista.length > 0){
        setTarefa(lista)
      }     
    },
    []
  );

  const onChangeInput = (event) => {
    setInputValue(event.target.value)

    console.log(inputValue);
  }

  const criaTarefa = () => {
    const addTarefa = {
      id: Date.now(),
      texto: inputValue,
      completa: false
    }
    const novaListaDeTarefas = [...tarefas, addTarefa]
    setTarefa(novaListaDeTarefas)
    setInputValue("")
    console.log(tarefas);
  }

  const selectTarefa = (id) => {
    const listaDeTarefas = tarefas.map((tarefa) => {
      if(id === tarefa.id) {
        const novaTarefa = {
          ...tarefa,
          completa: !tarefa.completa
        }
        return novaTarefa
      } else {
        return tarefa
      }
    })
    setTarefa(listaDeTarefas)
  }
  // console.log(tarefas);

  const onChangeFilter = (event) => {
    setFiltro(event.target.value)
    console.log(filtro);
  }


  const listaFiltrada = tarefas.filter(tarefa => {
    switch (filtro) {
      case 'pendentes':
        return !tarefa.completa
      case 'completas':
        return tarefa.completa
      default:
        return true
    }
  });


  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={inputValue} onChange={onChangeInput} />
        <button onClick={criaTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={onChangeFilter}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <TarefaList>
        {listaFiltrada.map(tarefa => {
          return (
            <Tarefa
              key={tarefa.id}
              completa={tarefa.completa}
              onClick={() => selectTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          )
        })}
      </TarefaList>
    </div>
  )
}


export default App
