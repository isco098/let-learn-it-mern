import { PostContext } from "../contexts/PostContext";
import { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../contexts/AuthContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import SinglePost from "../components/posts/SinglePost";
import addIcon from "../assets/plus-circle-fill.svg";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";

const Dashboard = () => {
    //Contexts
    const {authState: {user:{username}}} = useContext(AuthContext);

    const {
        postState: {post, posts, postsLoading},
        getPosts: getPosts,
        setshowAddPostModal,
        showToast: {show, message, type},
        setShowToast,
    } = useContext(PostContext);

    // Start: Get all posts
    useEffect (() => getPosts(), []);

    let body = null;
    if(postsLoading){
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    }else if(posts.length === 0){
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>Click the button below to tract your firts skill to learn</Card.Text>
                        <Button variant="primary" onClick={setshowAddPostModal.bind(this,true)} >LearnIt</Button>
                    </Card.Body>
                </Card>
            </>
        )
    }else{
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map(post => (
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>
                {/* Open Add Post Modal */}
                <OverlayTrigger placement="left" overlay={<Tooltip>Học thêm những điều tuyệt vời</Tooltip>}>
                    <Button className='btn-floating' onClick={setshowAddPostModal.bind(this, true)}>
                        <img src={addIcon} alt='add-post' width='60' height='60'/>
                    </Button>
                </OverlayTrigger>
            </>
        )
    }

    return (
        <>
            {body}
            <AddPostModal />
            {post !== null  && <UpdatePostModal />}
            <Toast 
                show={show} 
                style={{position: 'fixed', top:'10%', right: '10px'}} 
                className={`bg-${type} text-white`}
                onClose={setShowToast.bind(this, {
                    show: false,
                    message: '',
                    type: null,
                })}
                delay={5000}
                autohide
            >
                <Toast.Body>
                    <strong>
                        {message}
                    </strong>
                </Toast.Body>
            </Toast>
        </>
    )
}

export default Dashboard;