import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const CreationDialog = ({
  description,
  onCloseModal,
  openModal,
  title,
  name,
  saveValue,
}) => {
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
      open={openModal}
      onClose={onCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <TextField
          id="nameCreateItemInDialog"
          label={description}
          onChange={(event) => handleInputChange(event)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={addItem} color="primary">
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreationDialog.propTypes = {
  description: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default CreationDialog;
