import {ChangeEvent, FormEvent, useState} from 'react';
import './style.css';

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const params: Param[] = [
  {id: 1, name: 'Назначение', type: 'text'},
  {id: 2, name: 'Длина', type: 'text'},
];

const model: Model = {
  paramValues: [
    {paramId: 1, value: 'повседневное'},
    {paramId: 2, value: 'макси'},
  ],
};

const PROPS: Props = {params, model};

export const App = () => {
  const [props, setProps] = useState<Props>(PROPS);
  const [model, setModel] = useState('');
  const getParamValue = (paramId: number) => {
    const paramValue = props.model.paramValues.find(
      (value) => value.paramId === paramId
    );
    return paramValue ? paramValue.value : '';
  };

  const handleChangeInputValue = (
    e: ChangeEvent<HTMLInputElement>,
    paramId: number
  ) => {
    const value = e.target.value;
    const paramValues = props.model.paramValues.map((paramValue) => {
      if (paramValue.paramId === paramId) {
        paramValue.value = value;
      }
      return paramValue;
    });
    setProps((prev) => ({...prev, model: {...prev.model, paramValues}}));
  };

  const getModel = (e: FormEvent<HTMLFormElement>, currentProps: Props) => {
    e.preventDefault();
    const model = JSON.stringify(currentProps, null, 4);
    return setModel(model);
  };

  return (
    <div className="app">
      <form onSubmit={(e) => getModel(e, props)}>
        {props.params.map((param) => (
          <div key={param.id} className="param">
            <label htmlFor={`${param.id}_input`}>{param.name}</label>
            <input
              type={param.type}
              id={`${param.id}_input`}
              value={getParamValue(param.id)}
              onChange={(e) => handleChangeInputValue(e, param.id)}
            />
          </div>
        ))}
        <button type="submit">get model</button>
      </form>
      {model && <code className="code">{model}</code>}
    </div>
  );
};
