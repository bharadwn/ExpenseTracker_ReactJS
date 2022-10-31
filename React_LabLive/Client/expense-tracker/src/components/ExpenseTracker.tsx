import {ChangeEvent, Component, FormEvent} from 'react';
import { pushDataFromUser } from '../services/menu';

type Props={
    onTrue:any,
    onClose:any
}

type State={
    product:string,
    price:number,
    payeeName:string,
    setDate:string
    errorMsg:string;
}

class ExpenseTracker extends Component<Props,State> {
    constructor(props:Props){
        super(props);
        this.state={
            payeeName:"",
            product:"",
            price:0,
            setDate:"",
            errorMsg:""
        }
    }

    //FORM VAlidation
    //can give any product- just numbers is also ok, code is flexible to allow for some creative naming/code format of product
    //Payee will be only two people presented in the fields

    //for price validation
    verifyPrice(person:State){
       return person.price>=0?true:false;
    }

    //for date validation
    validateDate(value:string) {

        console.log("the year is ****"+(new Date(value)).getFullYear());
        console.log("the month is ****"+((new Date(value)).getMonth()));

        const enteredMonth =(new Date(value)).getMonth();
        const presentMonth=new Date().getMonth();
        const presentYear=new Date().getFullYear();
        const enteredYear=(new Date(value)).getFullYear();
        

        //if present year and previous month - invalid
        if (enteredYear-presentYear===0) { 
            if ((enteredMonth-presentMonth)>=0)
                return true;
            else 
                return false;
        }
        //if next year - valid... but not beyond next year-invalid
        if (enteredYear-presentYear>=0 && enteredYear-presentYear<=1) {            //present year and present month + may be max 1 year ahead
            console.log(enteredMonth-presentMonth);
            return true;
        } else {
            //too far back from present day
            return false;
        }
      }

      verifyPayee(payeeName:string){
        if (payeeName==="Rahul" || payeeName==="Ramesh"){
            console.log("Valid Payee.")
            return true;
        }else{
            return false;
        }
      }

    submitHandler = async (event : FormEvent<HTMLFormElement>) => {
        //call api to create new purchase
        //    event.preventDefault();
        event?.preventDefault();
        // console.log(this.state)
        const finalData = {
            ...this.state
        }

        //form validation before sending to the server
        //for price 0 is ok, <0 invalid, >0 valid, 
        if(!this.verifyPrice(this.state)){
            this.setErrorMessage("Price not valid, please enter an amount > 0");
           throw new Error("Price not valid");
        };

        //for date-present year , present month- till next full year ok
        if(!this.validateDate(this.state.setDate)){
            this.setErrorMessage("Date is not valid, please enter a valid date");
            throw new Error("Date not valid.");
        }
        //payee verification
        if(!this.verifyPayee(this.state.payeeName)){
            this.setErrorMessage("Payee is not valid");
            throw new Error("Payee not valid.");
        }
        //  const data = await pushDataFromUser(finalData);
        await pushDataFromUser(finalData);
        // console.log(data);
        this.props.onTrue();
    }
 
    setProduct = (event: ChangeEvent<HTMLInputElement>) => {
     this.setState({
         product:event.target.value
     });
    }
    setPayee = (event: ChangeEvent<HTMLSelectElement>) => {
     this.setState({
         payeeName:event.target.value
     });
    }
    //for error handling
    setErrorMessage=(msg:string)=>{
        this.setState({
            errorMsg:msg
        })
    }
    setPrice = (event : ChangeEvent<HTMLInputElement>) => {
     this.setState({
         price : parseInt(event.target.value)
     })
     } 
     setLoggedDate = (e : ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        console.log(typeof (e.target.value));
     
        this.setState({setDate : e.target.value,  });
     }

    render(){
        return (<>
            <section>
                <header>
                    <h1>Add New Item</h1>
                    <p>Read the below instructions before proceeding:<br /> Make sure you fill all the fileds where * is provided</p>
                </header>
            
            <form onSubmit={this.submitHandler}>
                <article>
                    <p>Name</p>
                    <select name="Name" required value={this.state.payeeName} 
                    onChange={this.setPayee}>
                        <option value="" defaultChecked>Choose</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Ramesh">Ramesh</option>
                    </select>
                </article>
                <article>
                    <p>Product Purchased</p>
                    <input type="text" required value={this.state.product} onChange={this.setProduct}></input>
                </article>
                <article>
                    <p>Price</p>
                    <input type="number" min="0" required value={this.state.price} onChange={this.setPrice}/>
                </article>
    
                <article>
                    <p>Date</p>
                    <input type="date" required value={this.state.setDate} onChange={this.setLoggedDate}/>
                </article>
                <button type="button" className="form-button" onClick={this.props.onClose}>Close</button>
                    
                <button type="submit" className="form-button">Submit</button>
                {
                    this.state.errorMsg && ( <h4>{ this.state.errorMsg} </h4> )
                }
            </form>
            </section>
        </>);
       }
}
 
export default ExpenseTracker;