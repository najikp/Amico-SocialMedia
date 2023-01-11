import ChatModel from '../Models/chatModel.js';



//create chat
export const createChat=async(req,res)=>{
    let flag=0;
    const newChat=new ChatModel({
        members:[req.body.senderId,req.body.receiverId]
    });
    const response=await ChatModel.find()
    response.map((value)=>{
        const arr1=value.members;
        const arr2=[req.body.senderId,req.body.receiverId]
        if(arr1[0]===arr2[0]&&arr1[1]===arr2[1]){
            flag=1;
        }
        
    })

    try {
        if(flag===0){
            const result=await newChat.save();
            res.status(200).json('Chat room Created, Please click on message icon to chat')
        }else{
            console.log('click one to message icone')
            res.status(200).json('Click on Message icon to chat')
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//userchats
export const  userChats=async(req,res)=>{
    try {
        const chat=await ChatModel.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}



//findChat
export const findChat=async(req,res)=>{
    try {
        const chat = await ChatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}