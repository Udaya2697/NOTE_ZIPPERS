import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../component/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
import Loading from "../../component/Loading";
import ErrorMessage from "../../component/ErrorMessage";
import axios from "axios";

function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };
  const Sendemail=async(event) =>{
    
    event.preventDefault()
    console.log(event.target)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data={

      id:userInfo._id,
      time:event.target.value,
      note:event.target.name
    }
    const response= await axios.post('/sendmail',data,config)
    console.log(notes)
    
  }
  
  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(notes)}
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Note
        </Button>
        </Link>
        <Link to="/professionalMyNote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          professional Notes
      </Button>
      </Link>
      {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )} */}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes &&
        notes
          // .filter((filteredNote) =>
          //   filteredNote.title.toLowerCase().includes(search.toLowerCase())
          // )
          .reverse()
          .map((note) => (
            <Accordion>
              <Card style={{ margin: 10 }} key={note._id}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(note)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {note.title}
                    </Accordion.Toggle>
                  </span>
                  <div>
                  <input type="text" value={note.date.split("T")[0]} style={{marginTop:"8px",height:"20px",width:"75px"}}/>
                  </div>
                  <div>
                  <NavDropdown title="Remanider" style={{position: "relative", display: "inline-block"}}>
                      <NavDropdown.Item><button value="10h"name={note._id} onClick={Sendemail}>10h</button></NavDropdown.Item>
                      <NavDropdown.Item><button value="1d" name={note._id} onClick={Sendemail}>1d</button></NavDropdown.Item>
                      <NavDropdown.Item><button value="3d" name={note._id} onClick={Sendemail}>3d</button></NavDropdown.Item>
                      <NavDropdown.Item><button value="1w" name={note._id} onClick={Sendemail}>1w</button></NavDropdown.Item>
                      </NavDropdown>
                  </div>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                  
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body style={{minHeight:"230px"}}>
                    <h4>
                      <Badge variant="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
  
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyNotes;