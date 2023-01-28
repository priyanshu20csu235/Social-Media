import e from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req,res)=>
{
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
        // res.send(postMessages);
    } catch (error) {
        res.status(404).json({message : "Error 404!"});
    }
}
export const createPosts = async (req,res) =>
{
    const postBody=req.body;
    const newPost = new PostMessage(postBody);
    try {
       await newPost.save();
       res.status(200).json(newPost);
    } catch (error) {
        res.status(404).json({message : "Error 404!"});
    }
}

export const updatePost = async (req,res) => {
    const _id = req.params.id;
    
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatePost = await PostMessage.findByIdAndUpdate(_id,post,{new : true});

    res.json(updatePost);
} 

export const deletePost = async (req,res) => {
    const _id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    try {
        const post = await PostMessage.findByIdAndDelete({_id : _id});

        if(post===null)
        {
            res.send("No Record Found");
        }
        else
        res.send("Deleted Post Successfully!!");

    } catch (error) {
        res.send("Some error occurred :(");
    }
}