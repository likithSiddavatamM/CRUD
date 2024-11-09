//importing modules
import express from "express";

import { PostController } from '../Controllers/post.controller'

//initiating the router
export const router = express.Router()

//add post route
router.post('/',PostController.addpost)

//get posts
router.get('/', PostController.getPosts)

//Route to consume the data
router.get('/consume',PostController.consume)

//get single post
router.get('/:id', PostController.getAPost)

//update a post
router.put('/:id', PostController.updatePost)

//delete a post
router.delete('/:id', PostController.deletePost)

