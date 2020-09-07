import React, { Component } from 'react';
import {
  BsPlusCircle,
  BsTrashFill,
  BsPencil,
  BsCheckCircle,
  BsArrowCounterclockwise,
  BsCheck,
  BsReplyAllFill,
} from 'react-icons/bs';
import axios from 'axios';
import { Container } from './styles';

export default class Main extends Component {
  state: {
    descricao: string;
    tarefas: [];
    editar: boolean;
    updateObject: { id: string; description: string };
  } = {
    descricao: '',
    tarefas: [],
    editar: false,
    updateObject: { id: '', description: '' },
  };

  constructor(props) {
    super(props);
    this.setDescricao.bind(this);
    this.setTafera.bind(this);
    this.deleteTarefa.bind(this);
    this.getTarefas.bind(this);
    this.modeUpdateTarefa.bind(this);
    this.rollbackUpdateTarefa.bind(this);
    this.tarefaConcluida.bind(this);
    this.reabrirTarefa.bind(this);
  }

  public render(): JSX.Element {
    const { descricao, tarefas, editar, updateObject } = this.state;
    const taferasJSX = tarefas.map(
      (value: { id: string; description: string; done: boolean }, index) => {
        if (!value) {
          return <></>;
        }
        const Done = !value.done ? (
          <BsCheckCircle
            onClick={(e) => {
              this.tarefaConcluida(e, value.id);
            }}
          />
        ) : (
          <BsArrowCounterclockwise
            onClick={(e) => {
              this.reabrirTarefa(e, value.id);
            }}
          />
        );
        const IconAlter =
          editar && updateObject.id === value.id ? (
            <BsReplyAllFill
              onClick={(e) => {
                this.rollbackUpdateTarefa(e);
              }}
            />
          ) : (
            <BsPencil
              onClick={(e) => {
                this.modeUpdateTarefa(e, value);
              }}
            />
          );

        return (
          <>
            <tr className="row" key={value.id}>
              <td>{index + 1}</td>
              <td>
                <input
                  className="inputDesc"
                  type="text"
                  value={value.description}
                  disabled
                />
              </td>
              <td>
                <button className="btn-op" type="button">
                  <BsTrashFill
                    onClick={(e) => {
                      this.deleteTarefa(e, value.id, index);
                    }}
                  />
                </button>
              </td>
              <td>
                <button className="btn-op" type="button">
                  {IconAlter}
                </button>
              </td>
              <td>
                <button className="btn-op" type="button">
                  {Done}
                </button>
              </td>
            </tr>
          </>
        );
      },
    );

    const Mode = !editar ? (
      <BsPlusCircle
        className="btn-bs"
        onClick={(e) => {
          this.setTafera(e);
        }}
      />
    ) : (
      <BsCheck
        className="btn-bs"
        onClick={(e) => {
          this.updateTafera(e);
        }}
      />
    );

    return (
      <Container>
        <form action="#" className="formulario">
          <input
            type="text"
            value={descricao}
            onChange={(e) => this.setDescricao(e)}
          />
          <button className="btn" type="button">
            {Mode}
          </button>
        </form>
        <div className="tabela">
          <table>
            <tbody>
              {React.Children.map(taferasJSX, (el) => {
                return React.cloneElement(el as React.ReactElement);
              })}
            </tbody>
          </table>
        </div>
      </Container>
    );
  }

  setDescricao(e: any) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      descricao: e.target.value,
    });
  }

  setTafera(e: any) {
    e.preventDefault();
    const { tarefas, descricao } = this.state;

    axios({
      baseURL: process.env.BASE_URL_ORIGIN || 'http://localhost:5000/task',
      method: 'POST',
      data: { description: descricao, done: false },
    })
      .then((res) => {
        this.setState({
          tarefas: [
            ...tarefas,
            { id: res.data.task.id, description: res.data.task.description },
          ],
          descricao: '',
        });
      })
      .catch(() => {
        this.setState({
          descricao: '',
        });
      });
  }

  deleteTarefa(e, id, index) {
    axios({
      baseURL: process.env.BASE_URL_ORIGIN || 'http://localhost:5000/task',
      method: 'DELETE',
      params: { id },
    })
      .then((res) => {
        this.getTarefas();
      })
      .catch(() => {
        this.setState({
          descricao: '',
        });
      });
  }

  getTarefas() {
    axios({
      baseURL: process.env.BASE_URL_ORIGIN || 'http://localhost:5000/task',
      method: 'GET',
    })
      .then((res) => {
        this.setState({
          tarefas: [...res.data.tasks],
        });
        const { tarefas } = this.state;
        console.log(tarefas);
      })
      .catch((err) => console.log(err.message));
  }

  modeUpdateTarefa(e: any, obj: { description: string; id: string }) {
    this.setState({
      descricao: obj.description,
      editar: true,
      updateObject: obj,
    });
  }

  rollbackUpdateTarefa(e: any) {
    this.setState({
      descricao: '',
      editar: false,
      updateObject: { id: '', description: '' },
    });
  }

  updateTafera(e: any) {
    e.preventDefault();
    const { tarefas, descricao, updateObject } = this.state;

    axios({
      baseURL: process.env.BASE_URL_ORIGIN || 'http://localhost:5000/task',
      method: 'PUT',
      data: { description: descricao },
      params: { id: updateObject.id },
    })
      .then((res) => {
        this.setState({
          editar: false,
          descricao: '',
          updateObject: { id: '', description: '' },
        });
        this.getTarefas();
      })
      .catch(() => {
        this.setState({
          descricao: '',
        });
      });
  }

  tarefaConcluida(e, id) {
    e.preventDefault();

    axios({
      baseURL: process.env.BASE_URL_ORIGIN || 'http://localhost:5000/task',
      method: 'PUT',
      data: { done: true },
      params: { id },
    })
      .then((res) => {
        this.getTarefas();
      })
      .catch(() => {
        this.setState({
          descricao: '',
        });
      });
  }

  reabrirTarefa(e, id) {
    e.preventDefault();

    axios({
      baseURL: process.env.BASE_URL_ORIGIN || 'http://localhost:5000/task',
      method: 'PUT',
      data: { done: false },
      params: { id },
    })
      .then((res) => {
        this.getTarefas();
      })
      .catch(() => {
        this.setState({
          descricao: '',
        });
      });
  }

  componentDidMount() {
    axios({
      baseURL: process.env.BASE_URL_ORIGIN || 'http://localhost:5000/task',
      method: 'GET',
    })
      .then((res) => {
        this.setState({
          tarefas: [...res.data.tasks],
        });
        const { tarefas } = this.state;
        console.log(tarefas);
      })
      .catch((err) => console.log(err.message));
  }
}
