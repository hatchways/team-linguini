import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogtitle: {
    marginTop: "60px",
    textAlign: "center",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    "& .MuiPaper-root": {
      width: "490px",
      height: "400px",
    },
    "& .MuiDialogContent-root": {
      justifyContent: "center",
      height: "100px",
    },
  },
  dialogstyle: {
    display: "flex",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "stretch",
    justifyContent: "center",
  },
  dialogButtonStyle: {
    display: "flex",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "stretch",
    justifyContent: "center",
  },
  inputCenter: {
    textAlign: "center",
    color: "red",
    width: "200px",
    marginTop: "40px"
  },
  addModel: {
    background: "#759CFC",
    color: "white",
    boxShadow: "none",
    marginTop: "40px",
    width: "150px",
    "&:hover": {
      background: "#759CFC",
    },
  },
  dialogAction: {
    display: "flex",
    width: "150px",
  },
}));

const CreateModelByName = ({
  description,
  onCloseModal,
  openModal,
  title,
  name,
  saveValue,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState({ name: "" });

  const handleInputChange = (event) => {
    const { value } = event.target;
    setValue({ [name]: value });
  };

  const addItem = () => {
    saveValue(value);
    onCloseModal();
  };

  return (
    <Dialog
      maxWidth={false}
      className={classes.root}
      width={500}
      open={openModal}
      onClose={onCloseModal}
      aria-labelledby="customized-dialog-title"
      //aria-describedby="alert-dialog-description"
    >
      
      <Typography variant={"h4"} className={classes.dialogtitle}>{title}</Typography>
      <DialogContent>
        <div className={classes.dialogstyle}>
          <TextField
            id="nameCreateItemInDialog"
            variant="outlined"
            label={description}
            onChange={(event) => handleInputChange(event)}
            className={classes.inputCenter}
          />
        </div>
        <div className={classes.dialogButtonStyle}>
          <DialogActions className={classes.dialogAction}>
            <Button onClick={addItem} className={classes.addModel}>
              Create
            </Button>
          </DialogActions>
        </div>
      </DialogContent>
    </Dialog>
  );
};

CreateModelByName.propTypes = {
  description: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default CreateModelByName;
