import React, { Component } from "react";
import UserLayout from "../Home/UserLayout";
import FormField from "../utils/Forms/formField";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields,
} from "../utils/Forms/formActions";
import FileUpload from "../utils/Forms/fileupload";
import { connect } from "react-redux";
import { addOrder,addItem } from "../../actions/order_actions";
import { getCustomers } from "../../actions/customer_actions";

class AddOrder extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      title: {
        element: "input",
        value: "",
        config: {
          label: "رقم الطلب",
          name: "op_input",
          type: "text",
          placeholder: "أدخل رقم الطلب",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "السعر الكلي",
          name: "price_input",
          type: "number",
          placeholder: "ادخل السعر الكلي",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      currency: {
        element: "select",
        value: "",
        config: {
          label: "العملة",
          name: "currency_input",
          options: [
            { key: 0, value: "USD" },
            { key: 1, value: "EUR" },
            { key: 2, value: "GBP" },
            { key: 3, value: "CD" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      customer: {
        element: "select",
        value: "",
        config: {
          label: "العميل",
          name: "customer_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      shipped: {
        element: "select",
        value: "",
        config: {
          label: "مكتملة",
          name: "shipped_input",
          options: [
            { key: true, value: "مكتملة" },
            { key: false, value: "جديدة" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
    },
    itemdata:{
      description: {
        element: "input",
        value: "",
        config: {
          label: "الوصف ",
          name: "des_input",
          type: "text",
          placeholder: "أدخل وصف الطلب",
        },
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      images: {
        value: [],
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showlabel: false,
      },
    }
  };
  imagesHandler = (images) => {
    const newItemData = {
      ...this.state.itemdata,
    };
    newItemData["images"].value = images;
    newItemData["images"].valid = true;

    this.setState({
      itemdata: newItemData,
    });
  };
  updateFields = (newFormdata) => {
    this.setState({
      formdata: newFormdata,
    });
  };
  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "orders");
    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };
  updateItemForm = (element) => {
    const newItemData = update(element, this.state.itemdata, "items");
    this.setState({
      formError: false,
      itemdata: newItemData,
    });
  };
  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "orders");
    let formIsValid = isFormValid(this.state.formdata, "orders");

    if (formIsValid) {
      this.props.dispatch(addOrder(dataToSubmit)).then(() => {
        if (this.props.orders.addOrder.success) {
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };
  submitItem = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.itemdata, "items");
    let formIsValid = isFormValid(this.state.itemdata, "items");

    if (formIsValid) {
      this.props.dispatch(addItem(dataToSubmit)).then(() => {
        if (this.props.items.addItem.success) {
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({
        formError: true,
      });
    }
  };
  componentDidMount() {
    const formdata = this.state.formdata;
    console.log(this.props.orders);
    this.props.dispatch(getCustomers()).then((response) => {
      console.log(response.payload);
      const newFormData = populateOptionFields(
        formdata,
        response.payload,
        "customer"
      );
      this.updateFields(newFormData);
    });
  }
  render() {
    return (
      <UserLayout>
        <div className="container" style={{ marginTop: "30px" }}>
          <h1>اضافة طلب</h1>
          <form
            onSubmit={(event) => this.submitForm(event)}
            style={{ marginTop: "30px" }}
          >
            <FormField
              id={"title"}
              formdata={this.state.formdata.title}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"price"}
              formdata={this.state.formdata.price}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"currency"}
              formdata={this.state.formdata.currency}
              change={(element) => this.updateForm(element)}
            />
            <div className="form_devider"></div>

            <FormField
              id={"customer"}
              formdata={this.state.formdata.customer}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"shipped"}
              formdata={this.state.formdata.shipped}
              change={(element) => this.updateForm(element)}
            />

            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}

            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={(event) => this.submitForm(event)}>
              Add order
            </button>
          </form>
          <hr/>
          <h1>اضافة عنصر</h1>
          <form
            onSubmit={(event) => this.submitItem(event)}
            style={{ marginTop: "30px" }}
          >
           <FileUpload
              imagesHandler={(images) => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />
            <FormField
              id={"description"}
              formdata={this.state.itemdata.description}
              change={(element) => this.updateItemForm(element)}
            />

            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}

            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={(event) => this.submitItem(event)}>
              اضف عنصر
            </button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};

export default connect(mapStateToProps)(AddOrder);
