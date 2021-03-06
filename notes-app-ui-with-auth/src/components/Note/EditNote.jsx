import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
    error: {
        color: 'red'
    }
});

class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            noteTitle: this.props.notes.filter(note => note.id === parseFloat(this.props.match.params.id))[0].noteTitle,
            noteDescription: this.props.notes.filter(note => note.id === parseFloat(this.props.match.params.id))[0].noteDescription,
            error: ''
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleUpdateNote = this.handleUpdateNote.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleNoteTitleChange = this.handleNoteTitleChange.bind(this);
        this.handleNoteDescriptionChange = this.handleNoteDescriptionChange.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true });
    }
    
    handleClose() {
        this.setState({ 
            open: false,
            noteTitle: '',
            noteDescription: '',
            error: ''
        });
        this.props.history.push('/home');
    }

    handleNoteTitleChange(event) {
        this.setState({ noteTitle: event.target.value });
    }

    handleNoteDescriptionChange(event) {
        this.setState({ noteDescription: event.target.value });
    }

    handleUpdateNote() {
        if (!this.state.noteTitle) {
            this.setState({ error: 'Title is needed to update note' });
            return;
        }

        const updatedNote = {
            id: parseFloat(this.props.match.params.id),
            noteTitle: this.state.noteTitle,
            noteDescription: this.state.noteDescription,
        }
        this.props.handleUpdateNote(updatedNote);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="Edit note form"
            >
                <DialogTitle id="Edit note form">
                    Edit Note
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="note title"
                        label="Note Title"
                        type="text"
                        fullWidth
                        onChange={this.handleNoteTitleChange}
                        value={this.state.noteTitle}
                    />
                    <TextField
                        margin="dense"
                        id="note description"
                        label="Note Description"
                        type="text"
                        onChange={this.handleNoteDescriptionChange}
                        value={this.state.noteDescription}
                        fullWidth
                    />
                </DialogContent>
                <Typography className={classes.error} component={'span'} >
                        {this.state.error}
                </Typography>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={this.handleUpdateNote} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(EditNote);