import { useState, useRef } from "react";
import Draggable from "react-draggable";
import MainMenuButton from './MainMenuButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import AuthenticateUser from './AuthenticateUser';
import LogoutButton from './LogoutButton';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function NotesPage() {

    AuthenticateUser();
    const [boxes, setBoxes] = useState([]);
    const nodeRef = useRef(null);

    const addTextbox = () => {
        setBoxes([
            ...boxes,
            { id: Date.now(), text: "" }
        ]);
    };

    const deleteTextbox = (id) => {
        setBoxes(boxes.filter(b => b.id !== id));
    };

    const updateText = (id, value) => {
        setBoxes(boxes.map(b =>
            b.id === id ? { ...b, text: value } : b
        ));
    };

    return (
        <>
              <Row>
                <Col><h1>Infinite Sticky Notes!</h1> <br />
                    <Button variant="outline-success" onClick={addTextbox}>Add Sticky Note</Button>

                </Col>
                <Col>
                    <div style={{ paddingTop: '20px' }} className="d-flex justify-content-end">
                        <ButtonGroup>
                            <MainMenuButton />
                            <LogoutButton />
                        </ButtonGroup>

                    </div>
                </Col>

            </Row>

            {boxes.map(box => {


                return (
                    <Draggable key={box.id} nodeRef={nodeRef}>
                        <div
                            ref={nodeRef}
                            style={{
                                position: "absolute"
                            }}
                        >
                            {/* wrapper */}
                            <div style={{ position: "relative" }}>
                                {/* Delete button */}
                                <button
                                    onClick={() => deleteTextbox(box.id)}
                                    style={{
                                        position: "absolute",
                                        top: 4,
                                        right: 4,
                                        zIndex: 2,
                                        border: "none",
                                        color: "red",
                                        width: 20,
                                        height: 20,
                                        cursor: "pointer",
                                        background: "none",

                                    }}
                                >
                                    X
                                </button>


                                <textarea
                                    value={box.text}
                                    onChange={e =>
                                        updateText(box.id, e.target.value)}
                                    rows={4}
                                    cols={25}
                                    placeholder="Move me"
                                    style={{
                                        resize: "both",
                                        padding: "8px",
                                        cursor: "move",
                                        paddingRight: "28px"
                                    }}
                                />
                            </div>
                        </div>
                    </Draggable>
                );
            })}
            
        </>
    );
}
