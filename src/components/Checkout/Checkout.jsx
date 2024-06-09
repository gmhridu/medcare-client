import React, { useState } from "react";
import useStyle from "./CheckoutStyle.jsx";
import InformationForm from "../Forms/CheckoutForm/InformationForm.jsx";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Forms/CheckoutForm/CheckoutForm.jsx";
import { Paper, StepLabel, Stepper, Typography, Step } from "@material-ui/core";

const steps = ["Fill the Form", "Payment Details"];
const Checkout = ({ closeModal, isOpen, campInfo, stripePromise, user }) => {
  const classes = useStyle();
  const [activeStep, setActiveStep] = useState(0);
  const [joinCampData, setJoinCampData] = useState({});

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const FormData = () => {
    return activeStep === 0 ? (
      <InformationForm
        Next={handleNextStep}
        Back={handleBackStep}
        campInfo={campInfo}
        user={user}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    ) : (
        <CheckoutForm
          Next={handleNextStep}
          Back={handleBackStep}
          campInfo={campInfo}
          user={user}
          closeModal={closeModal}
          isOpen={isOpen}
        />
    );
  };
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.Stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <FormData />
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
