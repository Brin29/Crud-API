import { useEffect, useState } from "react"

const initialForm = {
  name: "",
  constellation: "",
  id: null,
}

export const CrudForm = ({createData, updateData, dataToEdit, setDataToEdit}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit){
      setForm(dataToEdit);
    }
    else{
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.name || !form.constellation ){
      alert("Datos incompletos")
      return;
    }

    if (form.id === null){
      createData(form);
    }
    else{
      updateData(form)
    }

    handleReset();
  }

  const handleReset = () => {
    setForm(initialForm);
    // Actualizar al valor inicial
    setDataToEdit(null);
  }


  return (
    <div>
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre"  onChange={handleChange} value={form.name}/>

        <input type="text" name="constellation" placeholder="Constelación" onChange={handleChange} value={form.constellation}/>

        <input type="submit" value="Enviar"/>

        {/* limpiar para el proceso de create y update*/}
        <input type="reset" value="Limpiar" onClick={handleReset}/>
      </form>
    </div>
  )
}

CrudForm.propTypes