import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CircleIcon from "@mui/icons-material/Circle";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import { Comments } from "../components/Comments";
import { Card } from "../components/Card";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { fetchSuccess } from "../redux/videoSlice";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const Recommendation = styled.div`
  flex: 2;
`;

const VideoWrapper = styled.div`
  flex: 2;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.text};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;


export const Video = () => {

  const {currentVideo} = useSelector((state) => state.video);

  //why reducer for current Video fetching and why ot for the channel name means 
  //by using the usestate if any changes are made then after refreshing the page only we can see them
  //but by using the useSelector the immedidate changes can be seen like (liking the post) (disliking post)
  //etc

  const dispatch = useDispatch();

  //to get video id from the params comes in router of react
  const path = useLocation().pathname.split("/")[2];
  const [channel,setChannel] = useState({});

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`http://localhost:8800/api/videos/find/${path}`);
        const channelRes = await axios.get(`http://localhost:8800/api/users/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();    
  },[dispatch,path]);

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views <CircleIcon sx={{ fontSize: 8 }} /> {format(currentVideo.createdAt)}
          </Info>
          <Buttons>
            <Button>
              <ThumbUpOutlinedIcon /> {currentVideo.likes?.length}
            </Button>
            <Button>
              <ThumbDownOffAltOutlinedIcon /> {currentVideo.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>
                {channel.desc}
              </Description>
            </ChannelDetail>
            <Description />
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Comments />
      </Content>
      <Recommendation>
        <Card type="sm" video={currentVideo} />
        <Card type="sm" video={currentVideo} />
        <Card type="sm" video={currentVideo} />
        <Card type="sm" video={currentVideo} />
        <Card type="sm" video={currentVideo} />
        <Card type="sm" video={currentVideo} />
        <Card type="sm" video={currentVideo} />
        <Card type="sm" video={currentVideo} />
        <Card type="sm" video={currentVideo} />
        <Card type="sm" video={currentVideo} />
        <Card type="sm" video={currentVideo} />
        <Card type="sm" video={currentVideo} />
      </Recommendation>
    </Container>
  );
};
