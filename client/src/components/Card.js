import React, {Fragment, useState} from "react";
import {Dialog, Button, Typography, Grid, TextField} from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from "@material-ui/core/Box";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {theme} from "../themes/theme";


const DialogTitle = (props) => {
    const classes = makeStyles(theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(4),
            height: theme.spacing(8),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        }
    }))();

    const { children, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

const Buttons = () => {
    const classes = makeStyles(theme => ({
        root: {
            height: 30,
            width: 116,
        }
    }))();

    return (
        <Fragment>
            <Typography>ADD TO CARD</Typography>
            <Button variant="contained" className={classes.root}>Tag</Button>
            <Button variant="contained" className={classes.root}>Check-list</Button>
            <Button variant="contained" className={classes.root}>Deadline</Button>
            <Button variant="contained" className={classes.root}>Attachment</Button>
            <Typography>ACTIONS</Typography>
            <Button variant="contained" className={classes.root}>Move</Button>
            <Button variant="contained" className={classes.root}>Copy</Button>
            <Button variant="contained" className={classes.root}>Share</Button>
            <Button variant="contained" className={classes.root}>Delete</Button>
        </Fragment>
    )
}

const CardStyle = theme => ({
    root: {
        height: 700,
        width: 840
    },
    descriptionForm: {
        maxWidth: 635
    }
})

const Card = (props) => {
    const card = {
        title: 'Card tittle',
        _id: '',
        description: 'I am very happy'
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const classes = makeStyles(CardStyle)();

    return(
        <Box component={'div'}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open dialog
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
                    maxWidth={false}
                    classes={{paper: classes.root}}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {card.title}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid spacing={4}>
                        <Grid item>
                            <Typography>Description</Typography>
                            <Box component={'form'}>
                                <TextField multiline name='description' fullWidth variant={'outlined'}>{card.description}</TextField>
                                <Button variant={'contained'} color={"secondary"} type={'submit'}>Save</Button>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Buttons/>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default Card;