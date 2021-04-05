import axios from "axios";
import { ADD_ORDER, GET_ACTIVE_ORDER, GET_DONE_ORDER,ADD_ITEM } from "./types";
import { ORDER_SERVER } from "../components/utils/misc";

export function getActiveOrders() {
  const request = axios
    .get(`${ORDER_SERVER}?shipped=false`)
    .then((response) =>{
      return {
        articles: response.data.articles,
      };
    });
  return {
    type: GET_ACTIVE_ORDER,
    payload: request,
  };
}

export function getِDoneOrders() {
  const request = axios
    .get(`${ORDER_SERVER}?shipped=true`)
    .then((response) =>{
      return {
        articles: response.data.articles,
      };
    });
  return {
    type: GET_DONE_ORDER,
    payload: request,
  };
}

export function addOrder(datatoSubmit) {
  const request = axios
    .post(`${ORDER_SERVER}/`, datatoSubmit)
    .then((response) => response.data);

  return {
    type: ADD_ORDER,
    payload: request,
  };
}

export function addItem(datatoSubmit) {
  const request = axios
    .post(`${ORDER_SERVER}/items`, datatoSubmit)
    .then((response) => response.data);

  return {
    type: ADD_ITEM,
    payload: request,
  };
}