import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useContext, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';

const AddPostModal = () => {
    // Contexts
    const {showAddPostModal, setshowAddPostModal, addPost, setShowToast} = useContext(PostContext);

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });

    const {title, description, url} = newPost;

    const onChanageNewPostForm = event => setNewPost({...newPost, [event.target.name]: event.target.value});

    const closeDialog = () => {
        resetAddPostData();
    };

    const onSubmit = async event => {
        event.preventDefault();
        const {success, message} = await addPost(newPost);
        resetAddPostData();
        setShowToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const resetAddPostData = () => {
        setNewPost({ 
            title: '',
            description:'',
            url: '',
            status: 'TO LEARN',
        });
        setshowAddPostModal(false);
    }

    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>
                    What do you want to learn?
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
                            onChange={onChanageNewPostForm}
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
                            onChange={onChanageNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group className='pd-bottom'>
                        <Form.Control 
                            type='text' 
                            placeholder='Tutorial URL' 
                            name='url'
                            value={url}
                            onChange={onChanageNewPostForm}
                        />
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

export default AddPostModal