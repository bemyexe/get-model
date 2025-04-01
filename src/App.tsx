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
  [key: string]: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const params: Param[] = [
  {id: 1, name: 'Назначение', type: 'text'},
  {id: 2, name: 'Длина', type: 'text'},
  {id: 3, name: 'Цвет', type: 'color'},
  {id: 4, name: 'Цена', type: 'number'},
];

const model: Model = {
  paramValues: [
    {paramId: 1, value: 'повседневное'},
    {paramId: 2, value: 'макси'},
  ],
  color: [{paramId: 3, value: '#ff0000'}],
  price: [{paramId: 4, value: '1000'}],
};

const PROPS: Props = {params, model};

interface ParamEditorProps {
  param: Param;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, paramId: number) => void;
}

const ParamEditor = ({param, value, onChange}: ParamEditorProps) => {
  return (
    <div key={param.id} className="param">
      <label htmlFor={`${param.id}_input`}>{param.name}</label>
      <input
        type={param.type}
        id={`${param.id}_input`}
        value={value}
        onChange={(e) => onChange(e, param.id)}
      />
    </div>
  );
};

export const App = () => {
  const [props, setProps] = useState<Props>(PROPS);
  const [model, setModel] = useState('');
  const getParamValue = (paramId: number) => {
    const model: Model = props.model;
    for (const key in model) {
      const currentParam = model[key].find(
        (currentParam) => currentParam.paramId === paramId
      );
      if (currentParam) return currentParam.value;
    }
    return '';
  };

  const handleChangeInputValue = (
    e: ChangeEvent<HTMLInputElement>,
    paramId: number
  ) => {
    const value = e.target.value;
    setProps((prev) => {
      const model = {...prev.model};
      for (const key in model) {
        const currentParam = model[key].find(
          (currentParam) => currentParam.paramId === paramId
        );
        if (currentParam) currentParam.value = value;
      }
      return {
        ...prev,
        model,
      };
    });
  };

  const getModel = (e: FormEvent<HTMLFormElement>, currentProps: Props) => {
    e.preventDefault();
    const model = JSON.stringify(currentProps, null, 4);
    return setModel(model);
  };

  return (
    <div className="app">
      <form onSubmit={(e) => getModel(e, props)} className="form">
        {props.params.map((param) => (
          <ParamEditor
            key={param.id}
            param={param}
            value={getParamValue(param.id)}
            onChange={(e) => handleChangeInputValue(e, param.id)}
          />
        ))}
        <button type="submit">get model</button>
      </form>
      {model && <code className="code">{model}</code>}
    </div>
  );
};
