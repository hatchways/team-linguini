import React, { Fragment, useState } from "react";
import { Dialog, Button, Typography, Grid, TextField, InputBase, DialogActions, Select, MenuItem, Menu} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import { palette } from '@material-ui/system';
import { makeStyles, withStyles } from "@material-ui/core/styles";

const DialogTitle = (props) => {
  const classes = makeStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(4),
      height: theme.spacing(4),
    },
    title: {
      fontSize: 22,
      display: "inline-block",
      fontWeight: "bold",
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    colorLine: {
      height: "7px",
      width: "50px",
      display: "inline-block",
      borderRadius: "5px",
      padding: "auto",
      marginLeft: 10,
    },

  }))();

  const { children, onClose, colorCode, ...other } = props;

  const handleOnchange= () => {

  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.title}>{children}</Typography>
      <Box aria-haspopup="true" onClick={handleClick} className={classes.colorLine} bgcolor={"cardColor."+colorCode}></Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Box className={classes.colorLine} bgcolor={"cardColor.blue"}/></MenuItem>
        <MenuItem onClick={handleClose}><Box className={classes.colorLine} bgcolor={"cardColor.red"}/></MenuItem>
        <MenuItem onClick={handleClose}><Box className={classes.colorLine} bgcolor={"cardColor.green"}/></MenuItem>
        <MenuItem onClick={handleClose}><Box className={classes.colorLine} bgcolor={"cardColor.yellow"}/></MenuItem>
      </Menu>
      {/*<Select onChange={handleOnchange}>*/}
      {/*  <MenuItem value={'#5ACD76'}><Box component={"div"} className={classes.color1 + classes.colorLine}/></MenuItem>*/}
      {/*</Select>*/}
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const Buttons = (props) => {
  props = props.props;
  const classes = makeStyles((theme) => ({
    root: {
      height: 34,
      width: 116,
      marginBottom: 8,
    },
  }))();

  const handleClick = (value, setValue) => () => {
    if (value === undefined) {
      setValue('initial')
    } else {
      setValue(undefined)
    }
  }

  const handleTagClick = handleClick(props.showTag,props.setShowTag)
  const handleDeadlineClick= handleClick(props.showDeadline, props.setShowDeadline);
  const handleChecklistClick= handleClick(props.showChecklist, props.setShowChecklist);
  const handleAttachmentClick= handleClick(props.showAttachment, props.setShowAttachment);

  return (
    <Fragment>
      <Box mb={2}>ADD TO CARD</Box>
      <Button variant="contained" className={classes.root} onClick={handleTagClick}>
        Tag
      </Button>
      <Button variant="contained" className={classes.root} onClick={handleChecklistClick}>
        Check-list
      </Button>
      <Button variant="contained" className={classes.root} onClick={handleDeadlineClick}>
        Deadline
      </Button>
      <Button variant="contained" className={classes.root} onClick={handleAttachmentClick}>
        Attachment
      </Button>
      <Box mb={2} mt={3}>
        ACTIONS
      </Box>
      <Button variant="contained" className={classes.root}>
        Move
      </Button>
      {/*<Button variant="contained" className={classes.root}>*/}
      {/*  Copy*/}
      {/*</Button>*/}
      {/*<Button variant="contained" className={classes.root}>*/}
      {/*  Share*/}
      {/*</Button>*/}
      <Button variant="contained" className={classes.root}>
        Delete
      </Button>
    </Fragment>
  );
};

const CardStyle = (theme) => ({
  root: {
    height: 700,
    width: 840,
  },
  // descriptionForm: {
  //   maxWidth: 635,
  // },
  leftGrid: {
    width: 656,
    // [theme.breakpoints.up('sm')] : {
    //   width: 656
    // }
  },
  rightGrid: {
    width: 165,
    // [theme.breakpoints.up('sm')] : {
    //   width: 183
    // }
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomButton: {
    height: 34,
    width: 100,
    marginRight: theme.spacing(4),
  },
});

const Card = (props) => {
  const card = {
    title: "Card tittle",
    _id: "",
    colorCode: 'green',
    description: "I am very happy",
    deadline: new Date(2020, 4, 17),
    tags: ['Math', 'Biology']
  };

  const [showDeadline, setShowDeadline] = useState(undefined);
  const [showTag, setShowTag] = useState(undefined);
  const [showAttachment, setShowAttachment] = useState(undefined);
  const [showChecklist, setShowChecklist] = useState(undefined);


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = makeStyles(CardStyle)();

  const onSubmit = (values) => {
    window.localStorage.setItem("xxxxx", JSON.stringify(values));
  };

  return (
    <Box component={"div"}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={false}
        classes={{ paper: classes.root }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} colorCode={card.colorCode}>
          {card.title}
        </DialogTitle>
        <DialogContent dividers>
          <Box component={"form"}>
            <Grid container spacing={8}>
              <Grid item className={classes.leftGrid}>
                <Typography className={classes.label}>Description</Typography>
                <TextField
                  multiline
                  rows={5}
                  name="description"
                  fullWidth
                  variant={"outlined"}
                  defaultValue={card.description}
                  // onChange={(e) => e.target.description}
                />
                <Box display={showTag || 'none'}>
                  <Typography className={classes.label}>Tag</Typography>
                  <InputBase defaultValue={card.tags.join(', ')}/>
                  <TextField name={'tags'} placeholder={'add tag'}/>
                </Box>
                <Box display={showDeadline || 'none'}>
                  <Typography className={classes.label}>Deadline</Typography>
                  <TextField
                    id="deadline"
                    type="date"
                    defaultValue={card.deadline}
                    color={"secondary"}
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
                <Box display={showChecklist || 'none'}>
                  <Typography className={classes.label}>Check-list</Typography>
                </Box>
                <Box display={showAttachment || 'none'}>
                  <Typography className={classes.label}>Attachment</Typography>
                  <TextField type={'file'} name={'attachment'} variant={'outlined'}></TextField>
                </Box>
              </Grid>
              <Grid item className={classes.rightGrid}>
                <Buttons
                  props={{
                    setShowDeadline, setShowChecklist, setShowTag, setShowAttachment,
                    showDeadline, showChecklist, showTag, showAttachment
                  }}
                />
              </Grid>
            </Grid>
            <Button
              variant={"contained"}
              color={"secondary"}
              type={"submit"}
              className={classes.bottomButton}
            >
              Save
            </Button>
            {/*<Button*/}
            {/*  variant={"contained"}*/}
            {/*  // color={"secondary"}*/}
            {/*  type={"submit"}*/}
            {/*  className={classes.bottomButton}*/}
            {/*>*/}
            {/*  Cancel*/}
            {/*</Button>*/}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Card;
