import { useRef, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { v4 } from "uuid";

import { cnpj } from "cpf-cnpj-validator";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
import "./App.css";

function App() {
  const [qnt, setQnt] = useState<number>(1);
  const [cnpjs, setCnpjs] = useState<string[]>([]);

  const toast = useRef<any>(null);
  const showSuccess = () => {
    toast?.current?.show({
      severity: "success",
      summary: "Copiado",
      detail: "O cnpj copiado com sucesso!",
      life: 4000,
    });
  };

  const handleGenerateCnpj = () => {
    let a: string[] = [];
    for (let i = 0; i < qnt; i++) {
      const c = cnpj.generate();
      a.push(c);
    }
    setCnpjs(a);
  };

  return (
    <div className="container">
      <Toast ref={toast} position="bottom-center" />
      <h1>Gerador de cnpj</h1>
      <div>
        <h2>
          O gerador de cnpj mais rápido prático e objetivo{" "}
          <i className="pi pi-check" style={{ color: "green" }}></i>
        </h2>
        <p>Feito de programador para programadores</p>
      </div>
      <div className="card">
        <div className="p-fluid grid formgrid">
          <div className="field col-12 md:col-6">
            <InputNumber
              name="qnt"
              value={qnt}
              onChange={(e) => setQnt(Number(e.value))}
              showButtons
              buttonLayout="horizontal"
              style={{ textAlign: "center" }}
              min={1}
              max={16}
              decrementButtonIcon="pi pi-minus"
              incrementButtonIcon="pi pi-plus"
            />
          </div>

          <div className="field col-12 md:col-6">
            <Button
              label="Gerar"
              onClick={() => handleGenerateCnpj()}
              disabled={qnt < 1}
            />
          </div>
        </div>
        {cnpjs.length > 0 &&
          cnpjs.map((i) => (
            <p
              onClick={() => {
                window.navigator.clipboard.writeText(i);
                showSuccess();
              }}
              className="cursor-pointer"
            >
              {cnpj.format(i)}
              <i className="pi pi-link ml-3"></i>
            </p>
          ))}
      </div>
      <p className="read-the-docs">
        Clique <a href="https://gerarcpf.com.br">aqui</a> e conheça o gerador de
        cpf
      </p>
    </div>
  );
}

export default App;
