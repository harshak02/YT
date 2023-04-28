import React , {useEffect, useState} from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding : 20px 0px;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

//we no need to use currentVideo._id because aldready in Video we have sent the props of video_id
export const Comments = ({videoId}) => {

  const [comments , setComments] = useState([]);
  const { currentUser } = useSelector((state)=>state.user);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/comments/${videoId}`);
        setComments(res.data.comments);//res.data is imp
      } catch (err) {
        console.log(err);
      }
    }
    fetchComments();
  })

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.otherDetails.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map (comment => (
        <Comment key={comment._id} comment = {comment} />
      ))}
    </Container>
  );
};
