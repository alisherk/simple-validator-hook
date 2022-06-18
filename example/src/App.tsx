import './App.css';
import { object, string, SchemaOf } from 'yup';
import useFormValidator from 'simple-validator-hook';

interface Form {
  email: string;
  password: string;
}

const DEFAULT: Form = {
  email: '',
  password: '',
};

const SCHEMA: SchemaOf<Form> | any = object({
  email: string().required().email(),
  password: string().min(6),
});

function App() {
  const { errors, disabled, handleChange, handleSubmit } = useFormValidator(
    DEFAULT,
    SCHEMA,
    600
  );

  const _onSubmit = async (data: Form): Promise<void> => {
    console.log(data);
    //do whatever you want with the validated data
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <input type='text' onChange={handleChange} name='email' />
        <p> Error: {errors.email} </p>
        <input type='text' onChange={handleChange} name='password' />
        <p> Error: {errors.password} </p>
        <button disabled={disabled}> Submit </button>
      </form>
    </div>
  );
}

export default App;
