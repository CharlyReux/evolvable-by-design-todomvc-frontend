import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useEffect, useState } from "react"

//simple dialog to show the details of a todo item
export default function DetailDialog({ open, todo,title, onClose, getAuthorAndTag }) {
    const [[author, tag], setDetails] = useState(["", ""])
    
    const handleClose = () => {
        onClose()
    }

    useEffect(() => {
        if (open) {
            getAuthorAndTag(todo).then(async ([author, tag]) => {
                setDetails([author, tag])
            })
        }
    }, [open])

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Author: {author}
                </DialogContentText>
                <DialogContentText>
                    Tag: {tag}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
