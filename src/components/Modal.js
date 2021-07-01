import React from "react";
import exitButton from "../images/close-icon.svg";

import styled from "styled-components";
import moment from "moment";
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background: white;

  z-index: 1000;
`;
const ModalContent = styled.div`
  background-color: white;

  padding: 25px;
  width: 500px;
`;

const ModalHeader = styled.div`
  justify-content: space-between;

  display: flex;
`;
const MovieTitle = styled.span`
  align-self: center;

  color: black;
`;
const ModalImageAndText = styled.div`
  justify-content: space-evenly;
  display: flex;
`;
const ModalTextContainer = styled.div`
  width: 200px;
`;
const ModalText = styled.div`
  color: black;
  margin-top: 10px;
`;
const MovieImage = styled.img`
  float: left;
`;

const Modal = (props) => {
  const { showModal, selectedMovie, closeModal } = props;
  if (!showModal) {
    return null;
  }

  const m = moment(selectedMovie.releaseDate, "YYYY-MM-DD");

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <MovieTitle>
            <b>{selectedMovie.title}</b>
          </MovieTitle>
          <img
            onClick={() => {
              closeModal();
            }}
            src={exitButton}
            alt="exit"
          />
        </ModalHeader>
        <ModalImageAndText>
          <MovieImage
            src={selectedMovie.imagePath}
            width={250}
            height={400}
            alt="exit"
          />

          <ModalTextContainer>
            <ModalText>
              <b>Release Date</b> {m.format("LL")}
            </ModalText>
            <ModalText>{selectedMovie.overview}</ModalText>
            <ModalText>
              <b>{selectedMovie.voteAverage}</b> / 10 ({selectedMovie.voteCount}{" "}
              votes)
            </ModalText>
          </ModalTextContainer>
        </ModalImageAndText>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
