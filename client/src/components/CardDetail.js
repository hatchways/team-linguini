import React, { Fragment, useState } from "react";
import {
  FormGroup,
  Dialog,
  Button,
  Typography,
  Grid,
  TextField,
  InputBase,
  MenuItem,
  Menu,
  Checkbox,
  FormHelperText
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { authJSONFetch } from '../helpers/authFetch'
import {useDashboard} from '../context/dashboard/dashboard.provider'

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
      cursor: 'pointer'
    },
  }))();

  const { children, onClose, colorCode, setColorCode, ...other } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (color) => () => {
    setColorCode(color);
    setAnchorEl(null);
  };

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography className={classes.title}>{children}</Typography>
      <Box
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.colorLine}
        bgcolor={"cardColor." + colorCode}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose('blue')}>
          <Box className={classes.colorLine} bgcolor={"cardColor.blue"} />
        </MenuItem>
        <MenuItem onClick={handleClose('white')}>
          <Box className={classes.colorLine} bgcolor={"cardColor.purple"} />
        </MenuItem>
        <MenuItem onClick={handleClose('red')}>
          <Box className={classes.colorLine} bgcolor={"cardColor.red"} />
        </MenuItem>
        <MenuItem onClick={handleClose('green')}>
          <Box className={classes.colorLine} bgcolor={"cardColor.green"} />
        </MenuItem>
        <MenuItem onClick={handleClose('yellow')}>
          <Box className={classes.colorLine} bgcolor={"cardColor.yellow"} />
        </MenuItem>
        <MenuItem onClick={handleClose('white')}>
          <Box className={classes.colorLine} bgcolor={"cardColor.white"} />
        </MenuItem>
      </Menu>
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
      width: 112,
      marginBottom: 8,
      fontSize: 12,
      backgroundColor: "#D9E8FC",
    },
  }))();

  const handleClick = (value, setValue) => () => {
    if (value === undefined) {
      setValue("block");
    } else {
      setValue(undefined);
    }
  };

  const handleTagClick = handleClick(props.showTag, props.setShowTag);
  const handleDeadlineClick = handleClick(
    props.showDeadline,
    props.setShowDeadline
  );
  const handleChecklistClick = handleClick(
    props.showChecklist,
    props.setShowChecklist
  );
  const handleAttachmentClick = handleClick(
    props.showAttachment,
    props.setShowAttachment
  );


  return (
    <Fragment>
      <Box mb={2}>ADD TO CARD</Box>
      <Button
        variant="contained"
        className={classes.root}
        onClick={handleTagClick}
      >
        Tag
      </Button>
      <Button
        variant="contained"
        className={classes.root}
        onClick={handleChecklistClick}
      >
        Check-list
      </Button>
      <Button
        variant="contained"
        className={classes.root}
        onClick={handleDeadlineClick}
      >
        Deadline
      </Button>
      <Button
        variant="contained"
        className={classes.root}
        onClick={handleAttachmentClick}
      >
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
      <Button variant="contained" className={classes.root} onClick={props.handleDeleteClick}>
        Delete
      </Button>
    </Fragment>
  );
};

const ChecklistItems = (props) => {
  const { checklistItems, setChecklistItems } = props;

  const handleChecklist = (event) => {
    const newList = [...checklistItems];
    // const newItem = {
    //   content:
    // }
    newList[event.target.name].active = event.target.checked;
    setChecklistItems(newList);
  };

  const handleKeyPress = (event) => {
    // return;
    if (event.key === 'Enter'){
      event.preventDefault();
      const newList = [...checklistItems];
      newList.push({content: event.target.value, active: false});
      setChecklistItems(newList);
    }
  }

  return (
    <FormGroup>
      {checklistItems.map((item, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={item.active}
              onChange={handleChecklist}
              name={index}
              inputProps={{ 'aria-label': item.content }}
            />
          }
          label={item.content}
        />
      ))}
      <TextField
        multiline={true}
        rows={1}
        type="text"
        variant={"outlined"}
        placeholder={"Add an item ..."}
        size="small"
        onKeyDown={handleKeyPress}
      ></TextField>
    </FormGroup>
  );
};

const CardStyle = (theme) => ({
  root: {
    height: 700,
    width: 840,
  },
  leftGrid: {
    [theme.breakpoints.up('sm')] :{
      width: '79%',
    },
    [theme.breakpoints.down('sm')] :{
      width: '100%',
    }
  },
  rightGrid: {
    [theme.breakpoints.up('sm')] :{
      width: '21%',
    },
    [theme.breakpoints.down('sm')] :{
      width: '100%',
    }
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bottomButton: {
    height: 34,
    width: 100,
    marginRight: theme.spacing(4),
    marginTop: 20,
    color: '#ffffff'
  },
  datePicker: {
    textColor: "#759CFC",
    color: "#759CFC",
  },
});

const CardDetail = (props) => {
  const { handleClose, open } = props;
  const card = props.card;
  const {cards, setCards, columns, setColumns} = useDashboard();

  //States for showing the elements
  const [showDeadline, setShowDeadline] = useState(undefined);
  const [showTag, setShowTag] = useState(undefined);
  const [showAttachment, setShowAttachment] = useState(undefined);
  const [showChecklist, setShowChecklist] = useState(undefined);

  const [deadline, setDeadline] = useState(card.deadline);
  const [description, setDescription] = useState(card.description);
  const [colorCode, setColorCode] = useState(card.colorCode);
  const [tags, setTags] = useState(card.tags.join(', '));

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(undefined);

  const [checklistItems, setChecklistItems] = useState(card.checklist);

  const classes = makeStyles(CardStyle)();

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = '/api/v1/cards/'+card._id;
    const content = {
      deadline, description, colorCode, tags: tags.split(', '),
      checklist: checklistItems,
    }

    setIsFetching(true);

    authJSONFetch(url, {
      method: 'PUT',
      body: JSON.stringify(content)
    }).then(res => res.json())
      .then(data => {
        setIsFetching(false);

        if (data.error) {
          throw new Error(data.error);
          return;
        }
        setError(undefined);

        //Update the card to Dashboard Provider
        const newCards = {...cards};
        newCards[card._id] = data;
        setCards(newCards);

        //Close the dialog
        handleClose();
      })
      .catch(error => {
        setError(error.message);
      })
  };

  const handleDeleteClick = (event) => {
    const url = '/api/v1/cards/' + card._id;

    authJSONFetch(url, {method: 'DELETE'})
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error);
          return;
        }

        const newColumns = {...columns};
        const cardItems = columns[card.columnId].cards.filter(cardId => cardId.toString() !== card._id.toString());
        newColumns[card.columnId].cards = cardItems;
        setColumns(newColumns);

        const newCards = {...cards};
        console.log(newCards);
        delete newCards[card._id];
        console.log(newCards);
        setCards(newCards);

        console.log('delete card successfully')
        handleClose();
      })

  }

  const handleFileUpload = (event) => {
    event.preventDefault();
  }

  return (
    <Box component={"div"}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={false}
        classes={{ paper: classes.root }}
        onSubmit={handleSubmit}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          colorCode={colorCode}
          setColorCode={setColorCode}
        >
          {card.title}
        </DialogTitle>
        <DialogContent dividers>
          <Box component={"form"}>
            <Grid container spacing={8}>
              <Grid item className={classes.leftGrid}>
                <Box component={'div'} mb={2}>
                  <Typography className={classes.label}>Description</Typography>
                  <TextField
                    multiline
                    rows={5}
                    onChange={event => setDescription(event.target.value)}
                    fullWidth
                    variant={"outlined"}
                    defaultValue={card.description}
                    // onChange={(e) => e.target.description}
                  />
                </Box>
                <Box component={'div'} display={showTag || "none"}  mb={2} >
                  <Typography className={classes.label}>Tags</Typography>
                  <TextField
                    name={"tags"}
                    placeholder={"Add tag ..."}
                    size={"small"}
                    defaultValue={tags}
                    variant={"outlined"}
                    onChange={event => { event.preventDefault(); setTags(event.target.value)}}
                  />
                </Box>
                <Box component={'div'} mb={3} display={showChecklist || "none"}>
                  <Typography className={classes.label}>Check-list</Typography>
                  <ChecklistItems
                    checklistItems={checklistItems}
                    setChecklistItems={setChecklistItems}
                  />
                </Box>
                <Box component={'div'} pb={3} display={showDeadline || "none"}>
                  <Typography className={classes.label}>Deadline</Typography>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                      value={deadline}
                      ampm={false}
                      onChange={(date) => setDeadline(date)}
                      animateYearScrolling
                      clearable
                    />
                  </MuiPickersUtilsProvider>
                </Box>
                <Box component={'div'} mb={3} display={showAttachment || "none"} onSubmit={handleFileUpload}>
                  <Typography className={classes.label}>Attachment</Typography>
                  <Box component={'div'} variant={"outlined"}>
                    <InputBase type={'file'} name={'file'}/>
                    <Button type={'submit'} variant={'contained'} size={'small'} color={"secondary"}>Upload</Button>
                  </Box>
                  {/*<TextField*/}
                  {/*  type={"file"}*/}
                  {/*  name={"attachment"}*/}
                  {/*  variant={"outlined"}*/}
                  {/*></TextField>*/}
                  {/*<Button type={'submit'} variant={'contained'} size={'small'}>Upload</Button>*/}
                </Box>
              </Grid>
              <Grid item className={classes.rightGrid}>
                <Buttons
                  props={{
                    setShowDeadline,
                    setShowChecklist,
                    setShowTag,
                    setShowAttachment,
                    showDeadline,
                    showChecklist,
                    showTag,
                    showAttachment,
                    handleDeleteClick
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
            <Box mt={2} mb={2}><FormHelperText error={true}>{error}</FormHelperText></Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CardDetail;
