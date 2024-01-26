
const FormCheckbox = ({label, name, defaultValue, size}) => {
  
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>                
        <input 
          name={name}
          type="checkbox" 
          defaultChecked={defaultValue} 
          className={`checkbox checkbox-primary ${size}`} 
        />
      </label>      
    </div>
  );
};

export default FormCheckbox;