import React, { useState } from 'react';

export default function DynamicRadioButtons ({
  options,
  onSelect,
}: any) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event: any) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <div style={{maxWidth: '400px'}}>
      {/* <h3>Select an option:</h3> */}
      {options.map((option : any) => (
        <label className="radio">
          
          <input id={option.value} className="radio__input" type="radio" name="report_types" value={option.value} checked={selectedOption === option.value} onChange={handleOptionChange}/>
          <span className="radio__inner">
            <div style={{display: 'flex', justifyItems: 'center'}}>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div className="radio__tick"></div>
              </div>
              <div className="radio__text">
                {option.label}
              </div>
            </div>
            <div style={{display: 'flex'}}>
              {/* <div style={{width: '24px', height: '24px', marginRight: '8px'}}> </div> */}
              <div style={{color: '#6F767E', wordWrap: 'break-word', fontWeight: '500', textAlign: 'left', fontSize: '12px', marginLeft: '32px'}}>
                  Nhũ hoa (trừ trường hợp đang cho con bú, liên quan đến sức khỏe và hành động phản đối)
              </div>

            </div>
            
          </span>
        </label>
        // <div key={option.value} style={{display: 'flex', justifyItems: 'center'}}>
        //   <input
        //     type="radio"
        //     id={option.value}
        //     name="dynamicRadio"
        //     value={option.value}
        //     checked={selectedOption === option.value}
        //     onChange={handleOptionChange}
        //     className='radio__tick'
        //   />
        //   <label htmlFor={option.value} className='radio__text' style={{fontSize: '16px', fontWeight: '500'}}>{option.label}</label>
        // </div>
      ))}

    </div>
  );
};