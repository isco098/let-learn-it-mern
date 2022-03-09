const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/auth');

/**
 * GET 
 * Read collections posts
 */
router.get('/', verifyToken, async (req,res)=>{
    try {
        const posts = await Post.find({user: req.userId}).populate('user', ['username']);
        res.json({success: true, posts});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message: 'Internal server error',
        })
    }
});

/**
 * POST
 * Creat new Posts
 */
router.post('/', verifyToken, async(req,res)=>{
    const {title, description, url, status} = req.body

    if(!title){
        return res.status(400).json({
            success: false,
            messsage: 'Tiêu đề không được để trống',
        });
    }

    try {
        const newPost = new Post({
            title: title,
            description: description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
        });

        await newPost.save();
        res.json({
            success: true,
            message: 'Chúc bạn học tốt', post: newPost,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
});

/**
 * PUT
 * Update Posts
 */
router.put('/:id', verifyToken, async(req,res) => {
    const {title, description, url, status} = req.body

    if(!title){
        return res.status(400).json({
            success: false,
            messsage: 'Tiêu đề không được để trống',
        });
    }

    try {
        let updatePost = {
            title: title,
            description: description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            // user: req.userId,
        };
        const postUpdateCondition = {
            _id: req.params.id,
            user: req.userId
        };

        // {new: true} : thay thế kết quả sau khi update
        updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {new: true})
        if(!updatePost){
            return res.status(401).json({
                success: false,
                message: 'Posts not found or user not authorised'
            });
        }
        return res.json({
            success: true,
            message: 'Cập nhật thành công',
            post: updatePost,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

/**
 * DELETE
 * Delete Posts
 */
router.delete('/:id', verifyToken, async(req, res) =>{
    try {
        const postDeleteCondition = {
            _id: req.params.id,
            user: req.userId
        };
        const deletePost = await Post.findOneAndDelete(postDeleteCondition);
        if(!deletePost){
            return res.status(401).json({
                success: false,
                message: 'Posts not found or user not authorised'
            });
        }
        res.json({success: true, post: deletePost});
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});

module.exports = router;