//import modules
import { postServices } from '../Services/post.service'
import { Request, Response } from 'express'
import {PostschemaValidate} from '../Models/posts'

class postController {
    //add post controller
    addpost = async (req: Request, res: Response) => {
        const data = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description
        }
        const {error, value} = PostschemaValidate.validate(data)
        if(error)
            res.send(error.message)
        else
            res.status(201).send(await postServices.createPost(value))          
    }

    //get all posts
    getPosts = async (req: Request, res: Response) => {
        try{
            res.status(200).json(JSON.parse(JSON.stringify(await postServices.getPosts())))}
        catch(err){
            res.status(404).json(err)
        }
    }

    //get a single post
    getAPost = async (req: Request, res: Response) => {
        try{
            res.status(200).json(await postServices.getPost(req.params.id))}
        catch(err){
           res.status(404).json(err)
        }
    }

    //update post
    updatePost = async (req: Request, res: Response) => {
        try{
            res.status(200).json(await postServices.updatePost(req.params.id, req.body))}
        catch(error){
           res.status(404).json(error)
        }
    }

    //delete a post
    deletePost = async (req: Request, res: Response) => {
        try{
            res.status(200).json(await postServices.deletePost(req.params.id))}
        catch(err){
           res.status(404).json(err)
        }
    }
    
    //RabbitConsume for FunDoNotes Project
    consume=async (req: Request, res: Response) => {
        try{
            res.status(200).json(JSON.parse(await postServices.consume()))}
        catch(err){
           res.status(404).json(err)
        }
    }
}

//export class
export const PostController = new postController()