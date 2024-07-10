import React, { useState } from 'react'

export default function Mainarea() {
  const [data,setData]=useState({
    loanamount:'',
    intrest:'',
    paymenttype:'',
    amount:'',
  });
  const handleChange=(event)=>{
    const {name,value}=event.target;
    setData({
      ...data,
      [name]:value,
    });
  };
  // let total_loan_amt;
  let Remaining_amt;
  
  const [totalintrest,setTotalintrest]=useState('');
  const [intrest,setintrest]=useState('');

  const intrestcalculate=()=>{
    let total_intrest=data.loanamount*data.intrest;
    setintrest(total_intrest);
    setTotalintrest(total_intrest);
  }
  
  let total_loan_amt=parseInt(totalintrest) + parseInt(data.loanamount);
  
  const [result,setResult]=useState('')
  const loancalculate=(e)=>{
    window.location.href="#LoanDetails";
      e.preventDefault();
  if (totalintrest!==intrest) {
    // alert("Please Fill all box")
    alert('Please click Total intrest'+totalintrest+intrest)
  }
  // else {
    // total_loan_amt=parseInt(totalintrest) + parseInt(data.loanamount);
  // }
      else if (data.paymenttype==='month') {
        let loan_setled_time=parseInt(total_loan_amt) / parseInt(data.amount)/12;
        let Remaining_amt_cal=parseInt(total_loan_amt) / parseInt(data.amount);
        let Final_Remaining_months;
        // math.floor function is used to convert the remainder into decimal like 0.25 remainder is .25
        let calculate_Remaining_months=loan_setled_time-Math.floor(loan_setled_time);
        let Remaining_months=calculate_Remaining_months*12;
        let loan_setled_time_convertToInt=parseInt(loan_setled_time);
        let Remaining_months_convertToInt=parseFloat(Remaining_months);
  
        if (Remaining_months_convertToInt-Math.floor(Remaining_months_convertToInt)>0.50) {
          Final_Remaining_months=parseInt(Remaining_months_convertToInt+1)
          
        }else{
          Final_Remaining_months=parseInt(Remaining_months_convertToInt)
        }
        Remaining_amt=total_loan_amt-(Remaining_amt_cal*data.amount);

        setLoansetleal(loan_setled_time_convertToInt+" Year "+Final_Remaining_months+" Months")
        setResult(Remaining_amt);
      } else if (data.paymenttype==='year') {
        let loansetle=total_loan_amt / (data.amount);
        let loansetle_convertToInt=parseInt(loansetle);

        Remaining_amt=total_loan_amt-(loansetle_convertToInt*data.amount);
        setLoansetleal(loansetle_convertToInt+" Year's ")
        setResult(Remaining_amt);
        
      } else if(data.paymenttype==='week') {
        let loansetle=total_loan_amt / (data.amount);
        let loansetle_convertToInt=parseInt(loansetle);
        setLoansetleal(loansetle_convertToInt+" Week's ")

      }else {
      alert("' "+data.paymenttype+" ' It is not proper Payment Type")
    }
  
      
  }

  const [loansetlecal,setLoansetleal]=useState('');
  
  return (
    <>
    <div className='bg-orange-600 p-7'>
      <form className='flex flex-col items-center justify-center m-8 p-3' >
        <div className='p-5'>
            <label className='p-9'>Loan Amount </label>
            <input type='text' name='loanamount' className='p-2 rounded-md' placeholder='Enter a loan amount' onChange={handleChange} value={data.loanamount} ></input>
        </div>
        <div className='p-5'>
            <label className='p-16 '>Intrest</label>
            <input type='text' name='intrest' className='p-2 rounded-md' placeholder=' Intreast Eg: 0.5 ,0.11 etc' value={data.intrest} onChange={handleChange}/>
        </div>
        <div className='p-5'>
        <label className='p-11'>Total Intrest</label>
        <input type='text' className='p-2 rounded-md' value={totalintrest} placeholder='Click here'  onClick={intrestcalculate} required></input>
        </div>
        
        <div className='p-5'>
            <label className='p-9'>Payment Type </label>
            <input type='text' className='p-2 rounded-md' name='paymenttype'  placeholder='Eg: month/week/year' value={data.paymenttype} onChange={handleChange}></input>
        </div>
        <div className='p-5'>
            <label className='p-14'>Amount</label>
            <input type='text' name='amount' className='p-2 rounded-md max-w-fit' placeholder='Payment Amount'value={data.amount} onChange={handleChange} ></input>
        </div>
      
        <button className='bg-blue-600 p-2 rounded-lg '  onClick={loancalculate}>Submit</button>
        
      </form>
    </div>
    <div className='flex flex-col justify-center items-center' id='LoanDetails'>     
                <h1 className=' justify-center font-extrabold text-white text-lg bg-gray-900 p-1 m-5'>Loan Details</h1>
                <p>Your Total Loan :{total_loan_amt}</p>
                <p>You Should Pay Every {data.paymenttype}: {data.amount}</p>
                <p>Completing your loan :{loansetlecal}</p>
                <p>Remaining Amount :{result}</p>

            </div>
    </>

  );
}
