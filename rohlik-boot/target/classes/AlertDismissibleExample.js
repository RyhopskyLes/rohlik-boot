import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
export function  AlertDismissibleExample(props) {
	const [show, setShow] = useState(true);
  
	 
	  const handleDismiss = () => setShow(false);
	  const handleShow = () => setShow(true);
	  return (show ? <Alert variant={props.totalHits!==0 ? "success": "danger"} onClose={handleDismiss} dismissible>
	  Nalezeno <Alert.Link >{props.totalHits}</Alert.Link> výsledků.</Alert> : <Button variant="info" onClick={handleShow}>Zobrazit info o výsledcích</Button>)
     }
  