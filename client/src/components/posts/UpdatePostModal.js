import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';

const UpdatePostModal = () => {
    // Contexts
    const {
        postState: {post},
        showUpdatePostModal, 
        setshowUpdatePostModal, 
        updatePost, 
        setShowToast
    } = useContext(PostContext);

    const [updatedPost, setUpdatedPost] = useState(post);

    useEffect(() => setUpdatedPost(post), [post]);

    const {title, description, url, status} = updatedPost;

    const onChanageUpdatedPostForm = event => setUpdatedPost({...updatedPost, [event.target.name]: event.target.value});

    const closeDialog = () => {
        setUpdatedPost(post);
        setshowUpdatePostModal(false);
    };

    const onSubmit = async event => {
        event.preventDefault();
        const {success, message} = await updatePost(updatedPost);
        setshowUpdatePostModal(false);
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    // const resetAddPostData = () => {
    //     setNewPost({ 
    //         title: '',
    //         description:'',
    //         url: '',
    //         status: 'TO LEARN',
    //     });
    //     setshowAddPostModal(false);
    // }

    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Making progress?
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}> 
                <Modal.Body>
                    <Form.Group className='pd-bottom'>
                        <Form.Control 
                            type='text' 
                            placeholder='Title' 
                            name='title' 
                            required 
                            aria-describedby='title-help' 
                            value={title}
                            onChange={onChanageUpdatedPostForm}
                        />
                        <Form.Text id='title-help' muted></Form.Text>
                    </Form.Group>
                    <Form.Group className='pd-bottom'>
                        <Form.Control 
                            as='textarea' 
                            rows={3} 
                            placeholder='Description' 
                            name='description' 
                            value={description}
                            onChange={onChanageUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className='pd-bottom'>
                        <Form.Control 
                            type='text' 
                            placeholder='Tutorial URL' 
                            name='url'
                            value={url}
                            onChange={onChanageUpdatedPostForm}
                        />
                    </Form.Group> 
                    <Form.Group className='pd-bottom'>
                        <Form.Control 
                            as='select' 
                            value={status} 
                            name='status' 
                            onChange={onChanageUpdatedPostForm} 
                        >
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        LearnIt
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal