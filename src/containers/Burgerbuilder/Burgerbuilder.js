import React, {Component} from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/Buildcontrols/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

const INGREDIENT_PRICES={
    salad: 0.5,
    bacon: 0.4,
    cheese:1.3,
    meat: 0.7
};
class Burgerbuilder extends Component {
    state= {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing : false,
        loading: false
    }
    componentDidMount(){
        axios.get('https://react-my-burger-2c847.firebaseio.com/ingredients.json').then(
            response =>{
                this.setState({ingredients: response.data});
            })
    }
    updatePurchaseState(ingredients){
        
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;    
        }, 0);
        
       this.setState({purchasable: sum > 0});
        
    }
    addingredienthandler= (type) =>{
        const oldCount=this.state.ingredients[type];
        const updatedCount= oldCount+1;
        const updateIngredients= {
                ...this.state.ingredients
        };
        updateIngredients[type]=updatedCount;
        const priceaddition=INGREDIENT_PRICES[type];
        const oldprice=this.state.totalPrice;
        const newprice=oldprice+priceaddition;
        this.setState({totalPrice: newprice,ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }
    removeingredienthandler= (type) =>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0)
        {
            return;
        }
        const updatedCount= oldCount-1;
        const updateIngredients= {
                ...this.state.ingredients
        };
        updateIngredients[type]=updatedCount;
        const priceaddition=INGREDIENT_PRICES[type];
        const oldprice=this.state.totalPrice;
        const newprice=oldprice-priceaddition;
        this.setState({totalPrice: newprice,ingredients: updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }
    purchaseHandler= ()=>{
        this.setState({ purchasing: true});
    }
    purchaseCancelHandler= ()=>{
        this.setState({ purchasing: false});
    }
    purchaseContinueHandler= ()=>{
            // this.setState({loading: true,})
            // const order= {
            //     ingredients: this.state.ingredients,
            //     price: this.state.totalPrice,
            //     customer :{
            //         name: 'AK',
            //         address :{
            //                 street: 'test1',
            //                 zipcode: '4007',
            //                 country: 'India'
            //         },
            //         email: 'akgamil.com'
            //     },
            //     deliverymethod: 'fast'
            // }
            // axios.post('/orders.json',order)
            // .then(response => {
            //     this.setState({loading: false, purchasing: false})
            // })
            // .catch(error => {
            //     this.setState({loading: false,purchasing: false})
            //      });
                 const queryParams=[];
                for(let i in this.state.ingredients){
                 queryParams.push(encodeURI(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
                 }
                 queryParams.push('price='+this.state.totalPrice)
                 const queryString= queryParams.join('&');
                 this.props.history.push
                 ({
                     pathname: '/checkout',
                     search: '?' + queryString

                 });
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        } 
        let orderSummary=null;
       let burger=<Spinner />;
       if(this.state.ingredients)
       {
        burger=(
           <Aux>
       <Burger ingredients={this.state.ingredients} />
        <BuildControls 
        ingredientAdded={this.addingredienthandler}
        ingredientRemoved={this.removeingredienthandler}
        disabled={disabledInfo}
        purchasable={this.state.purchasable}
        ordered={this.purchaseHandler}
        price={this.state.totalPrice}
        />
        </Aux>
        );
        orderSummary=<OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        puchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
       />;
       }
       if(this.state.loading)
       {
           orderSummary=<Spinner/>
       }
    return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
            </Modal>
          {burger}
        </Aux>
    );
    }
  }
  
export default Burgerbuilder;