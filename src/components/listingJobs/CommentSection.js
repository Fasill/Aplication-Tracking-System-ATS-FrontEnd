import React, { useEffect, useState, useRef } from 'react';
import send from '../../assets/send.svg';
import { backEndLink } from '../../utils/Links.js';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const CommentSection = () => {
    const [oldComments, setOldComments] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleCommentSubmit = () => {
        const currentTime = getCurrentTime();
        const newCommentObj = { text: newComment, user: 'JohnDoe', time: currentTime };

        const token = localStorage.getItem('token');
        const jobId = location.pathname.split('/').pop();

        axios.post(`${backEndLink}/comment/add`, {
            JobId: jobId,
            token: token,
            text: newComment,
        })
            .then(response => {
                if (response.data.success) {
                    setComments([...comments, newCommentObj]);
                    setNewComment('');

                    // Scroll to the bottom after updating comments
                    
                } else {
                    console.error('Failed to add comment:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error adding comment:', error);
            });
    };

    const location = useLocation();

    useEffect(() => {
        

        const token = localStorage.getItem('token');
        const jobId = location.pathname.split('/').pop();

        axios.get(`${backEndLink}/comment/get?JobId=${jobId}&token=${token}`)
            .then(response => {
                if (response.data.success) {
                    setOldComments(response.data.data);
                    console.log(response.data.data);
                } else {
                    console.error('Failed to fetch old comments:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching old comments:', error);
            });
    }, [location.pathname]);

    return (
        <div className="mt-1  rounded-md overflow-clip w-[103%] pb-8">
            <ul className="mb-4 h-[320px] overflow-y-scroll">
                {oldComments.map(comment => (
                    <div key={comment.commentId} className="chat chat-end flex justify-end pl-3 pr-2 ">
                        <div className="chat-bubble grid justify-items-start bg-white border shadow-xl rounded-md">
                            <div className=''><p1 className="text-[#58595a]  flex text-start">{comment.text}</p1></div>
                            <div className=" border-t w-full flex justify-between"><p className='text-[10px] text-[#3e3e3f]'>{comment.timeStamp}</p> <p className='text-[10px] text-[#3e3e3f]'>|</p> <p className='text-[10px] text-[#3e3e3f]'>{comment.userName}</p></div>
                        </div>
                        <div className="avatar placeholder ">
                            <div className="bg-[#155263]  shadow-xl text-neutral-content rounded-full w-9 ">
                                <span>{comment.userName ? comment.userName.slice(0, 2).toUpperCase() : 'XX'}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {comments.map(comment => (
                    <div key={comment.id} className="chat chat-end flex justify-end pl-3 pr-2 w-full ">
                        <div className="chat-bubble grid justify-items-start bg-white border shadow-xl rounded-md">
                            <div className=''><p1 className="text-[#58595a]  flex text-start">{comment.text}</p1></div>
                            <div className="text-xs text-[#3e3e3f]">{comment.time} </div>
                        </div>
                        <div className="avatar placeholder ">
                            <div className="bg-[#155263]  shadow-xl text-neutral-content rounded-full w-9 ">
                                <span>ME</span>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
            <div className="flex mt-[-1rem] w-[75%] m-auto shadow-lg ">
                <textarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="w-full p-2 border rounded-md mr-2 h-[3rem] shadow-2xl "
                    placeholder="Add a comment..."
                />
                <button
                    onClick={handleCommentSubmit}
                    className="px-4  bg-[#155263] text-white rounded-md hover:bg-[#193f49] shadow-2xl"
                >
                    <img src={send} alt="send-icon" />
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
