import React from 'react';
import BurgerIngredient from './burgeringredient/burgeringredient';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import styles from './burger.module.css';

 const burger = ( props ) => { 
     console.log(props)
    let transformedIngredients = Object.keys(props.ingredients)  //converting an object into array
    .map(igKey => {
        return [...Array(props.ingredients[igKey])] // an array with two elements
        .map((_, i) => {
            return <BurgerIngredient key={ igKey + i} type={ igKey } />;
        })
    })
        .reduce((arr,ele)=>{
            return arr.concat(ele);
        },[]);
        if(transformedIngredients.length==0)
        {
            transformedIngredients = <p>Please start adding ingredients!</p>;
        }
    return (
        <div className={ styles.Burger }>
            <BurgerIngredient type="bread-top" />
           {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default withRouter(burger);