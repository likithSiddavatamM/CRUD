//import module
import { Post, } from '../Models/posts'
import {createClient} from 'redis'
import amqp, { Channel, Message } from 'amqplib';
const redisClient = createClient();
redisClient.connect();
import dotenv from 'dotenv'
dotenv.config();

export class postService {
    //create a post
    async createPost(data: any) {
        try {
            await Post.create(data)
            return "Post is created successfully"
        } catch (error) {
            console.log(error)
        }
    }

    //get all posts
    async getPosts() {
        try {
            return await Post.find()
        } catch (error) {
            console.log(error)
        }
    }

    //get a single post
    async getPost(id: string) { 
        try {
            const post = await Post.findById({_id:id})
            if (!post) 
                return 'post not available'
            return post
        } catch (error) {
            console.log(error)
        }
    }

    //update a post
    async updatePost(id: string, data: any) {
        try {
                const post = await Post.findOne({_id:id}, data, {new: true})                
                if(!post)
                    return "post not available"
                
                data.title?post.title=data.title:post.title=post.title
                data.author?post.author=data.author:post.author=post.author       
                data.description?post.description=data.description:post.description=post.description
                post.save();
                return "Updated data succeessfully"
       
        } catch (error) {
            console.log(error)
        }
    }

    //delete a post by using the find by id and delete 
    async deletePost(id: string) {
        try {
            const post = await Post.findOne({_id:id})
            if (post){
                await Post.deleteOne({_id:id})
                return 'post deleted'}
            else
                return 'no such posts'
            
        } catch (error) {
            console.log(error)
        }
    }

    //RabbitConsume for FunDoNotes Project
    async consume(): Promise<any> {
        const channel: Channel = await (await amqp.connect('amqp://localhost')).createChannel();
        
        await channel.assertExchange('DirectExchange', 'direct', { durable: true });
        await channel.assertQueue('rabbit', { durable: true });
        await channel.bindQueue('rabbit', 'DirectExchange', 'DIRECT');
        let consumedMessage;
        await channel.consume('rabbit', (data:any)=>{
            consumedMessage=data.content.toString()
            console.log(`This is the consumed message : ${data.content.toString()}`)
            channel.ack(data);
        });
        return consumedMessage;
    }
}

//export the class
export const postServices = new postService()