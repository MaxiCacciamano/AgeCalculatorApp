import { useEffect, useState } from 'react'
import './App.css'
import arrow from './assets/img/icon-arrow.svg'

function App() {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [error, setError] = useState("")
  const [age, setAge] = useState(null)
  
  // Convertir a números
  
  const dayNum = parseInt(day)
  const monthNum = parseInt(month)
  const yearNum = parseInt(year)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos
    if (!day || !month || !year) {
      setError(alert("Todos los campos son obligatorios"));
      return;
    }


    // Validar el día y el mes
    // if (dayNum < 1 || dayNum > 31) {
    //   setError(<a>Dia incorrecto</a>);
    //   return;
    // }else if(monthNum < 1 || monthNum > 12){
    //   setError(<a>Mes incorrecto</a>); 
    //   return
    // }
     if(dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12){
      // setError("Mes y dia incorrecto")
      error.dayNum = "incorrecto"
      return
    }else{
      setError("")
    }



    // Creación de fecha
    const currentDate = new Date();
    const selectedDate = new Date(yearNum, monthNum - 1, dayNum);

    // Validar que la fecha no sea en el futuro
    if (selectedDate >= currentDate) {
      setError("La fecha seleccionada no puede ser en el futuro");
      return;
    }

    // Lógica para calcular la edad
    const ageInMilliseconds =  currentDate - selectedDate;
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    const ageInMonths = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 30.44));
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

    // Restar años completos para obtener el resto de meses y días
    const remainingMonths = ageInMonths - (ageInYears * 12)
    const remainingDays = ageInDays - (ageInYears * 365) - (remainingMonths * 30)

    // console.log(currentDate)
    // console.log(selectedDate)
    // console.log(remainingMonths, "months")
    // console.log(remainingDays, "dias")


    // Establecer la edad
    setAge({ years: ageInYears, months: remainingMonths, days: remainingDays });
    setError("");
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className='form'>
        <label>
          <h6>DAY</h6>
          <input
            type='number'
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="DD"
            className={error ? 'placeholder-error' : 'input'}
            />
            {
              dayNum < 1 || dayNum > 12 ? 
              <a className={'input-error'}>Dia invalido</a>  
              :""
            }
        </label>
        <label>
          <h6>MONTH</h6>
          <input
            type='number'
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder = "MM"
            className={'input'}
            />
            {
              monthNum < 1 || monthNum > 12 ? 
              <a className={'input-error'}>Numero invalido</a>  
              :""
    
            }
        </label>
        <label>
          <h6>YEAR</h6>
          <input
            type='number'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='input'
            placeholder='YYYY'
          />
                      {
              yearNum > 2024 || yearNum < 1? 
              <a className={'input-error'}>No existe el año</a>  
              :""
    
            }
        </label>
        </div>
        <div className='line'></div>
        <div className='button'>
        <button type='submit' className={{"color": "white"}}><img src={arrow}/></button>
        </div>
      {error && <div>{error}</div>}
      </form>
      {
        age?
      age && (
        <div className='result'>
          <p><span className='age'>{age.years}</span>   <span>Year</span></p>
          <p><span className='age'>{age.months}</span>  <span> Months</span></p>
          <p><span className='age'>{age.days}</span>   <span>Days</span> </p>
        </div>
      ):
      <div className='result'>
      <p><span className='age'>--</span>   <span>Year</span></p>
      <p><span className='age'>--</span>  <span> Months</span></p>
      <p><span className='age'>--</span>   <span>Days</span> </p>
    </div>
    }
    </div>
  );
}

export default App;
