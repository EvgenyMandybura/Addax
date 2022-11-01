import React, { Fragment } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Launch } from "../types/launch";

const ModalBlock = styled.div`
  align-items: center;
  bottom: 0;
  justify-content: center;
  left: 0;
  overflow: hidden;
  padding: 0.4rem;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  opacity: 1;
  z-index: 400;
`;

const ModalOverlay = styled.a`
  background: rgba(247, 248, 249, 0.75);
  bottom: 0;
  cursor: default;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const ModalClose = styled.a`
  float: right !important;
  text-decoration: none !important;
  cursor: pointer;
  font-size: 1rem;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 0.1rem;
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  max-width: 850px;
  padding: 0 0.8rem;
  width: 100%;
  animation: slide-down 0.2s ease 1;
  z-index: 1;
  box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);
`;

const ModalBody = styled.div`
  overflow-y: auto;
  padding: 30px 10px;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #303742;
  padding: 20px 5px 10px 5px;
`;

const ModalTitle = styled.span`
  font-size: 30px;
  font-weight: 500;
`;

const InfoTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const VideoBlock = styled.div`
  margin: 24px auto;
`;

interface ModalProps {
  active: boolean;
  hideModal: () => void;
  launch: Launch;
}

export const Modal = ({ active, hideModal, launch }: ModalProps) => {
  return (
    <Fragment>
      {active && (
        <ModalBlock>
          <ModalOverlay onClick={() => hideModal()}></ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <ModalTitle>Launch details info</ModalTitle>
              <ModalClose onClick={() => hideModal()}>X</ModalClose>
            </ModalHeader>
            <ModalBody>
              <div>
                <InfoTitle>Title: </InfoTitle>
                <span>{launch.name}</span>
              </div>

              <div>
                <InfoTitle>Date: </InfoTitle>
                <span>
                  {dayjs(launch.date_utc).format("YYYY, MMMM D, h:mm A")}
                </span>
              </div>

              <div>
                <InfoTitle>Details: </InfoTitle>
                <span>{launch.details}</span>
              </div>

              <div>
                <InfoTitle>ID: </InfoTitle>
                <span>{launch.id}</span>
              </div>
              <div>
                <InfoTitle>Flight number: </InfoTitle>
                <span>{launch.flight_number}</span>
              </div>
              <div>
                <InfoTitle>Launchpad: </InfoTitle>
                <span>{launch.launchpad}</span>
              </div>
              <VideoBlock>
                <iframe
                  width="350"
                  height="200"
                  src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </VideoBlock>
            </ModalBody>
          </ModalContainer>
        </ModalBlock>
      )}
    </Fragment>
  );
};
export default Modal;
