import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./DeleteWarning.css";
import { useState } from "react";

const DeleteWarning = ({ opened,handleDelete,setAction }) => {
  const theme = useMantineTheme();
  const [close,setClose]=useState(true)
  const handleClose=()=>{
    setClose(false);
    setAction(false)
  }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={1}
      size="55%"
      opened={opened}
      onClose={() => setClose(false)}
    >
        <div className="warningMessage">
            <h4>Are you sure you want to delete this post?</h4>
        </div>
        <div className="warningButtons">
            <button className="buttonClose" onClick={handleClose}>Cancel</button>
            <button className="buttonDelete" onClick={handleDelete}>Delete</button>
        </div>
    </Modal>
  );
};

export default DeleteWarning;
